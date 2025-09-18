import pygame
import requests
from io import BytesIO
import random
import math
import time

# ---------- Init ----------
pygame.init()
# Init mixer lebih awal (buffer kecil = latency rendah)
try:
    pygame.mixer.init(frequency=44100, size=-16, channels=2, buffer=1024)
except Exception as e:
    print("Mixer init gagal (lanjut tanpa audio):", e)

SCREEN_WIDTH, SCREEN_HEIGHT = 1000, 700
FPS = 60

# Colors
PINK = (255, 182, 193)
LIGHT_PINK = (255, 218, 225)
DEEP_PINK = (255, 20, 147)
PURPLE = (147, 112, 219)
WHITE = (255, 255, 255)
BLACK = (0, 0, 0)
RED = (255, 0, 0)
GOLD = (255, 215, 0)
YELLOW = (255, 255, 0)
GREEN = (0, 255, 0)
CYAN = (0, 255, 255)

def load_image_from_url(url, width=None, height=None):
    try:
        resp = requests.get(url)
        img = pygame.image.load(BytesIO(resp.content)).convert_alpha()
        if width and height:
            img = pygame.transform.scale(img, (width, height))
        return img
    except Exception as e:
        print("Gagal load image:", e)
        surf = pygame.Surface((width, height))
        surf.fill(DEEP_PINK)
        return surf

def load_sound_from_url(url):
    try:
        resp = requests.get(url)
        return pygame.mixer.Sound(BytesIO(resp.content))
    except Exception as e:
        print("Gagal load sound:", e)
        return None

# ---------- Game Objects ----------
class StoryScene:
    def __init__(self, title, text_lines, background_color=LIGHT_PINK):
        self.title = title
        self.text_lines = text_lines
        self.background_color = background_color
        self.current_line = 0
        self.char_index = 0
        self.typing_speed = 28  # ms/char
        self.last_char_time = 0
        self.scene_complete = False

    def update(self):
        current_time = pygame.time.get_ticks()
        if not self.scene_complete and current_time - self.last_char_time > self.typing_speed:
            if self.current_line < len(self.text_lines):
                line = self.text_lines[self.current_line]
                if self.char_index < len(line):
                    self.char_index += 1
                    self.last_char_time = current_time
                else:
                    self.current_line += 1
                    self.char_index = 0
                    # jeda singkat antar-baris
                    self.last_char_time = current_time + 200
            else:
                self.scene_complete = True

    def draw(self, screen, font_large, font_medium, font_small):
        screen.fill(self.background_color)
        title_surface = font_large.render(self.title, True, DEEP_PINK)
        title_rect = title_surface.get_rect(center=(SCREEN_WIDTH//2, 100))
        screen.blit(title_surface, title_rect)

        y = 180
        for i in range(min(self.current_line + 1, len(self.text_lines))):
            line = self.text_lines[i]
            if i == self.current_line:
                line = line[:self.char_index]
            text_surface = font_medium.render(line, True, PURPLE)
            text_rect = text_surface.get_rect(center=(SCREEN_WIDTH//2, y))
            screen.blit(text_surface, text_rect)
            y += 50

        if self.scene_complete:
            prompt = font_small.render("Next", True, RED)
            prompt_rect = prompt.get_rect(center=(SCREEN_WIDTH//2, SCREEN_HEIGHT - 60))
            screen.blit(prompt, prompt_rect)

class Player:
    def __init__(self, x, y, jump_sound=None, image_url=None):
        self.x = x
        self.y = y
        self.width = 60
        self.height = 60
        self.vel_x = 0
        self.vel_y = 0
        self.speed = 5
        self.jump_power = 18
        self.on_ground = False
        self.gravity = 0.8
        self.color = DEEP_PINK
        self.hearts = 3
        self.score = 0
        self.invulnerable = 0
        self.jump_sound = jump_sound
        self.image = load_image_from_url(image_url, self.width, self.height)

    @property
    def rect(self):
        return pygame.Rect(self.x, self.y, self.width, self.height)

    def update(self, platforms):
        keys = pygame.key.get_pressed()
        self.vel_x = 0

        if keys[pygame.K_LEFT] or keys[pygame.K_a]:
            self.vel_x = -self.speed
        if keys[pygame.K_RIGHT] or keys[pygame.K_d]:
            self.vel_x = self.speed
        if (keys[pygame.K_SPACE] or keys[pygame.K_UP] or keys[pygame.K_w]) and self.on_ground:
            self.vel_y = -self.jump_power
            self.on_ground = False
            if self.jump_sound:
                self.jump_sound.play()

        # Gravity & movement
        self.vel_y += self.gravity
        self.x += self.vel_x

        # Horizontal bounds
        if self.x < 0: self.x = 0
        if self.x + self.width > SCREEN_WIDTH: self.x = SCREEN_WIDTH - self.width

        self.y += self.vel_y

        # Platform collision
        self.on_ground = False
        for p in platforms:
            if (self.x + self.width > p.x and self.x < p.x + p.width and
                self.y + self.height > p.y and self.y < p.y + p.height):
                if self.vel_y > 0:
                    self.y = p.y - self.height
                    self.vel_y = 0
                    self.on_ground = True
                elif self.vel_y < 0:
                    self.y = p.y + p.height
                    self.vel_y = 0

        # Ground
        if self.y + self.height >= SCREEN_HEIGHT - 50:
            self.y = SCREEN_HEIGHT - 50 - self.height
            self.vel_y = 0
            self.on_ground = True

        # I-frames
        if self.invulnerable > 0:
            self.invulnerable -= 1

    def take_damage(self):
        if self.invulnerable <= 0:
            self.hearts -= 1
            self.invulnerable = 60

    def draw(self, screen):
        if self.invulnerable > 0 and self.invulnerable % 20 < 10:
            # Blink (jangan gambar apa-apa → efek kedip)
            return  

        # Gambar image player
        screen.blit(self.image, (self.x, self.y))

        # Crown kecil di atas kepala player
        crown_x = self.x + self.width // 2
        crown_y = self.y - 5
        crown_pts = [
            (crown_x - 15, crown_y), (crown_x - 10, crown_y - 10),
            (crown_x - 5, crown_y - 5), (crown_x, crown_y - 15),
            (crown_x + 5, crown_y - 5), (crown_x + 10, crown_y - 10),
            (crown_x + 15, crown_y)
        ]
        pygame.draw.polygon(screen, GOLD, crown_pts)

class Platform:
    def __init__(self, x, y, width, height, color=PURPLE):
        self.x, self.y, self.width, self.height, self.color = x, y, width, height, color
    def draw(self, screen):
        pygame.draw.rect(screen, self.color, (self.x, self.y, self.width, self.height))
        pygame.draw.rect(screen, WHITE, (self.x, self.y, self.width, self.height), 2)

class Collectible:
    def __init__(self, x, y, type_name="gift"):
        self.x, self.y = x, y
        self.width, self.height = 25, 25
        self.type = type_name
        self.collected = False
        self.float_offset = 0
        self.float_speed = 0.1
        if type_name == "gift":
            self.color, self.points = GOLD, 10
        elif type_name == "heart":
            self.color, self.points = RED, 50
        elif type_name == "cake":
            self.color, self.points = PINK, 100
        elif type_name == "letter":
            self.color, self.points = WHITE, 200

    def update(self):
        self.float_offset += self.float_speed
        if self.float_offset > 1: self.float_offset = -1

    def draw(self, screen):
        if self.collected: return
        float_y = self.y + math.sin(self.float_offset * 10) * 5
        if self.type == "gift":
            pygame.draw.rect(screen, self.color, (self.x, float_y, self.width, self.height))
            pygame.draw.rect(screen, RED, (self.x + self.width//2 - 2, float_y, 4, self.height))
            pygame.draw.rect(screen, RED, (self.x, float_y + self.height//2 - 2, self.width, 4))
        elif self.type == "heart":
            cx, cy = self.x + self.width//2, float_y + 10
            pygame.draw.circle(screen, self.color, (cx - 5, cy), 8)
            pygame.draw.circle(screen, self.color, (cx + 5, cy), 8)
            pygame.draw.polygon(screen, self.color, [(cx - 10, cy + 5), (cx + 10, cy + 5), (cx, cy + 18)])
        elif self.type == "cake":
            pygame.draw.rect(screen, self.color, (self.x, float_y + 10, self.width, self.height - 10))
            pygame.draw.rect(screen, YELLOW, (self.x + self.width//2 - 2, float_y, 4, 10))
            pygame.draw.circle(screen, RED, (self.x + self.width//2, float_y), 3)
        elif self.type == "letter":
            pygame.draw.rect(screen, self.color, (self.x, float_y, self.width, self.height))
            pygame.draw.rect(screen, RED, (self.x, float_y, self.width, self.height), 2)
            pygame.draw.circle(screen, RED, (self.x + self.width//2, float_y + self.height//2), 4)

    def check_collision(self, player):
        if self.collected:
            return False
        if (player.x + player.width > self.x and player.x < self.x + self.width and
            player.y + player.height > self.y and player.y < self.y + self.height):
            self.collected = True
            return True
        return False

class Enemy:
    def __init__(self, x, y, patrol_range=100):
        self.x, self.y = x, y
        self.width, self.height = 30, 30
        self.speed = 2
        self.direction = 1
        self.start_x = x
        self.patrol_range = patrol_range
        self.color = BLACK

    def update(self):
        self.x += self.speed * self.direction
        if self.x > self.start_x + self.patrol_range or self.x < self.start_x - self.patrol_range:
            self.direction *= -1

    def draw(self, screen):
        pygame.draw.rect(screen, self.color, (self.x, self.y, self.width, self.height))
        pygame.draw.circle(screen, RED, (self.x + 8, self.y + 8), 3)
        pygame.draw.circle(screen, RED, (self.x + 22, self.y + 8), 3)

    def check_collision(self, player):
        return (player.x + player.width > self.x and player.x < self.x + self.width and
                player.y + player.height > self.y and player.y < self.y + self.height)

class Particle:
    def __init__(self, x, y, color):
        self.x, self.y = x, y
        self.vel_x = random.randint(-3, 3)
        self.vel_y = random.randint(-5, -1)
        self.life = 60
        self.max_life = 60
        self.color = color
    def update(self):
        self.x += self.vel_x
        self.y += self.vel_y
        self.vel_y += 0.1
        self.life -= 1
    def draw(self, screen):
        if self.life > 0:
            size = int((self.life / self.max_life) * 5) + 1
            pygame.draw.circle(screen, self.color, (int(self.x), int(self.y)), size)

# ---------- Game Core ----------
class BirthdayStoryGame:
    def __init__(self):
        self.screen = pygame.display.set_mode((SCREEN_WIDTH, SCREEN_HEIGHT))
        pygame.display.set_caption("\U0001F495 Birthday Love Story Adventure \U0001F495")
        self.clock = pygame.time.Clock()
        self.font_small = pygame.font.Font(None, 32)
        self.font_medium = pygame.font.Font(None, 42)
        self.font_large = pygame.font.Font(None, 64)

        bgm_url     = "https://x3n99.github.io/BGMsuperstar.mp3"
        jump_url    = "https://x3n99.github.io/jump.wav"
        collect_url = "https://x3n99.github.io/collect.wav"
        damage_url  = "https://x3n99.github.io/damage.wav"

        def load_sound_from_url(url):
            try:
                resp = requests.get(url)
                return pygame.mixer.Sound(BytesIO(resp.content))
            except Exception as e:
                print("Gagal load sound:", e)
                return None
        
        try:
            resp = requests.get(bgm_url)
            pygame.mixer.music.load(BytesIO(resp.content))
            pygame.mixer.music.set_volume(0.2)
            pygame.mixer.music.play(-1)
        except Exception as e:
            print("Play music gagal:", e)
        
        self.sound_jump = None
        self.sound_collect = None
        self.sound_damage = None

        # Efek suara
        self.sfx_jump   = load_sound_from_url(jump_url)
        self.sfx_collect= load_sound_from_url(collect_url)
        self.sfx_damage = load_sound_from_url(damage_url)

        self.platforms, self.collectibles, self.enemies, self.particles = [], [], [], []

        # State
        self.game_state = "intro"  # intro, story_scene, playing, chapter_end
        self.current_chapter = 0
        self.story_scenes = self.create_story_scenes()
        self.current_scene = None

        self.love_letters_collected = 0
        self.total_love_letters = 3

    def create_story_scenes(self):
        return {
            "intro": StoryScene("\U0001F495 Happy Birthday Sayang!! \U0001F495",
                                ["Sep 19 kirei na hito sekai ni umareta",
                                 "Sono hito ore no kanojo ni natta, hehe"]),
            "chapter1_start": StoryScene("Daisuki na kanojo e",
                                ["Taisetsu na hito ni natte",
                                 "Kanojo ni natte",
                                "Umarete kurete arigatou",
                                 "Tamani kenka siteru kedo",
                                 "Gomen ne ;;"]),
            "chapter2_start": StoryScene("Daisuki na kanojo e",
                                ["Ore wa ii karesii janainde wakatteru",
                                 "Omae ni kizutsukete, kanasii sasete, nakasete",
                                 "Ganbaru no tsumori nandakedo",
                                 "Kekyoku omae ni kanasii saseru",
                                 "Gomen ne ;;"]),
            "chapter3_start": StoryScene("Daisuki na kanojo e",
                                ["Konna ore de yokereba",
                                 "Isshoni obaachan to ojiichan ni naritai",
                                 "Omae wo shiawase ni sitai"]),
            "ending": StoryScene("Game owatta ppoi hihi",
                                ["Koko made kita ne oretachi",
                                 "Ore no jinsei ni haitte kurete arigatou!",
                                 "Itsuka aetara omae no tanjoubi no tame ni deeto ikou!",
                                 "Ima wa dekinai kedo ;;",
                                 "Itsuka omae to iro iro sitai! hihi",
                                 "Tanjoubi omedetou!!",
                                 "AISHITERUUUUUU!!!!!!!",])
        }

    def create_chapter_level(self, chapter):
        self.platforms.clear()
        self.collectibles.clear()
        self.enemies.clear()

        if chapter == 1:
            self.platforms += [
                Platform(150, 550, 150, 20), Platform(350, 450, 150, 20),
                Platform(550, 350, 150, 20), Platform(750, 250, 150, 20)
            ]
            self.collectibles += [
                Collectible(175, 520, "gift"),
                Collectible(375, 420, "heart"),
                Collectible(575, 320, "gift"),
                Collectible(775, 220, "letter"),
            ]
        elif chapter == 2:
            self.platforms += [
                Platform(100, 550, 120, 20), Platform(300, 450, 120, 20),
                Platform(500, 350, 120, 20), Platform(700, 250, 120, 20),
                Platform(200, 300, 100, 20), Platform(600, 150, 150, 20),
            ]
            self.collectibles += [
                Collectible(125, 520, "cake"),
                Collectible(325, 420, "gift"),
                Collectible(525, 320, "heart"),
                Collectible(225, 270, "gift"),
                Collectible(625, 120, "letter"),
            ]
            self.enemies.append(Enemy(400, 520, 80))
        elif chapter == 3:
            self.platforms += [
                Platform(80, 550, 120, 20), Platform(250, 450, 100, 20),
                Platform(400, 350, 100, 20), Platform(550, 250, 100, 20),
                Platform(700, 150, 100, 20), Platform(150, 250, 80, 20),
            ]
            self.collectibles += [
                Collectible(105, 520, "heart"),
                Collectible(275, 420, "cake"),
                Collectible(425, 320, "gift"),
                Collectible(575, 220, "heart"),
                Collectible(725, 120, "letter"),
            ]
            self.enemies += [Enemy(200, 520, 100), Enemy(500, 420, 60)]

    def update_game(self):
        self.player.update(self.platforms)

        # Enemies
        for e in self.enemies:
            e.update()
            if e.check_collision(self.player):
                if self.player.invulnerable == 0:  # hanya bunyi saat benar2 kena
                    self.player.take_damage()
                    if self.sfx_damage:
                        self.sfx_damage.play()

        # Collectibles
        for c in self.collectibles:
            c.update()
            if c.check_collision(self.player):
                self.player.score += c.points
                if c.type == "letter":
                    self.love_letters_collected += 1
                if self.sfx_collect:
                    self.sfx_collect.play()
                # Partikel
                for _ in range(10):
                    self.particles.append(Particle(c.x + c.width//2, c.y + c.height//2, c.color))

        # Partikel
        self.particles = [p for p in self.particles if p.life > 0]
        for p in self.particles:
            p.update()

        # Selesai chapter jika surat cinta bab ini sudah diambil
        love_letters_in_chapter = any(c.type == "letter" and c.collected for c in self.collectibles)
        if love_letters_in_chapter and self.game_state != "chapter_end":
            self.game_state = "chapter_end"

        # Kalah (reset posisi & nyawa)
        if self.player.hearts <= 0:
            self.player.hearts = 3
            self.player.x, self.player.y = 50, 400

    def draw_game(self):
        # Background gradient
        for y in range(SCREEN_HEIGHT):
            ratio = y / SCREEN_HEIGHT
            r = int(LIGHT_PINK[0] * (1 - ratio) + CYAN[0] * ratio)
            g = int(LIGHT_PINK[1] * (1 - ratio) + CYAN[1] * ratio)
            b = int(LIGHT_PINK[2] * (1 - ratio) + CYAN[2] * ratio)
            pygame.draw.line(self.screen, (r, g, b), (0, y), (SCREEN_WIDTH, y))

        # Ground
        pygame.draw.rect(self.screen, GREEN, (0, SCREEN_HEIGHT - 50, SCREEN_WIDTH, 50))

        # Objects
        for p in self.platforms: p.draw(self.screen)
        for c in self.collectibles: c.draw(self.screen)
        for e in self.enemies: e.draw(self.screen)
        for pt in self.particles: pt.draw(self.screen)
        self.player.draw(self.screen)

        # UI
        self.draw_ui()

    def draw_ui(self):
        chapter_text = self.font_small.render(f"Chapter {self.current_chapter}", True, DEEP_PINK)
        self.screen.blit(chapter_text, (10, 10))

        score_text = self.font_small.render(f"Scor: {self.player.score}", True, PURPLE)
        self.screen.blit(score_text, (10, 40))

        letters_text = self.font_small.render(f"Love Letter: {self.love_letters_collected}/3", True, RED)
        self.screen.blit(letters_text, (10, 70))

        for i in range(self.player.hearts):
            heart_x = SCREEN_WIDTH - 40 - (i * 35)
            pygame.draw.circle(self.screen, RED, (heart_x - 5, 25), 8)
            pygame.draw.circle(self.screen, RED, (heart_x + 5, 25), 8)
            pygame.draw.polygon(self.screen, RED, [(heart_x - 10, 30), (heart_x + 10, 30), (heart_x, 45)])

        if self.current_chapter <= 3:
            obj_text = self.font_small.render("Tujuan: Temukan love letter!", True, DEEP_PINK)
            self.screen.blit(obj_text, (10, 100))

    def run(self):
        running = True

        while running:
            for event in pygame.event.get():
                if event.type == pygame.QUIT:
                    running = False

                elif event.type == pygame.KEYDOWN:
                    if self.game_state == "intro":
                        if event.key == pygame.K_SPACE and self.current_scene and self.current_scene.scene_complete:
                            self.current_chapter = 1
                            self.current_scene = self.story_scenes["chapter1_start"]
                            self.game_state = "story_scene"

                    elif self.game_state == "story_scene":
                        if event.key == pygame.K_SPACE and self.current_scene and self.current_scene.scene_complete:
                            player_image_url = "https://x3n99.github.io/kanojo2.png"
                            if self.current_scene == self.story_scenes["chapter1_start"]:
                                self.create_chapter_level(1)
                                self.player = Player(50, 400, jump_sound=self.sfx_jump, image_url=player_image_url)
                                self.game_state = "playing"
                            elif self.current_scene == self.story_scenes["chapter2_start"]:
                                self.create_chapter_level(2)
                                self.player = Player(50, 400, jump_sound=self.sfx_jump, image_url=player_image_url)
                                self.game_state = "playing"
                            elif self.current_scene == self.story_scenes["chapter3_start"]:
                                self.create_chapter_level(3)
                                self.player = Player(50, 400, jump_sound=self.sfx_jump, image_url=player_image_url)
                                self.game_state = "playing"
                            elif self.current_scene == self.story_scenes["ending"]:
                                running = False

                    elif self.game_state == "chapter_end":
                        if event.key == pygame.K_SPACE:
                            if self.current_chapter == 1:
                                self.current_chapter = 2
                                self.current_scene = self.story_scenes["chapter2_start"]
                            elif self.current_chapter == 2:
                                self.current_chapter = 3
                                self.current_scene = self.story_scenes["chapter3_start"]
                            elif self.current_chapter == 3:
                                self.current_scene = self.story_scenes["ending"]
                            self.game_state = "story_scene"

                    elif self.game_state == "playing":
                        if event.key == pygame.K_ESCAPE:
                            self.game_state = "story_scene"

            # Render/update per state
            if self.game_state == "intro":
                if self.current_scene is None:
                    self.current_scene = self.story_scenes["intro"]
                self.current_scene.update()
                self.current_scene.draw(self.screen, self.font_large, self.font_medium, self.font_small)

            elif self.game_state == "story_scene":
                if self.current_scene:
                    self.current_scene.update()
                    self.current_scene.draw(self.screen, self.font_large, self.font_medium, self.font_small)

            elif self.game_state == "playing":
                self.update_game()
                self.draw_game()

            elif self.game_state == "chapter_end":
                self.screen.fill(LIGHT_PINK)
                done = self.font_large.render(f"{self.current_chapter} Owatta!", True, GOLD)
                self.screen.blit(done, done.get_rect(center=(SCREEN_WIDTH//2, 260)))
                celebrate = self.font_medium.render("Hebat sayang!", True, DEEP_PINK)
                self.screen.blit(celebrate, celebrate.get_rect(center=(SCREEN_WIDTH//2, 340)))
                next_text = "Next" if self.current_chapter < 3 else "Next"
                next_surf = self.font_medium.render(next_text, True, PURPLE)
                self.screen.blit(next_surf, next_surf.get_rect(center=(SCREEN_WIDTH//2, 420)))

            pygame.display.flip()
            self.clock.tick(FPS)

        # Ending screen
        self.screen.fill(LIGHT_PINK)
        final_text = self.font_large.render("KAHI!!!", True, DEEP_PINK)
        self.screen.blit(final_text, final_text.get_rect(center=(SCREEN_WIDTH//2, 300)))
        love_text = self.font_medium.render("AISHITERUYOOOOOO", True, PURPLE)
        self.screen.blit(love_text, love_text.get_rect(center=(SCREEN_WIDTH//2, 390)))
        pygame.display.flip()
        time.sleep(2)

        try:
            pygame.mixer.music.stop()
        except:
            pass
        pygame.quit()
        return

def main():
    try:
        game = BirthdayStoryGame()
        game.run()
    except Exception as e:
        print(f"Error: {e}")
        try:
            pygame.quit()
        except:
            pass
        return

if __name__ == "__main__":
    main()