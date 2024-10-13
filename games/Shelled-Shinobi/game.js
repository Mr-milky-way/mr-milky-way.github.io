--shelled shinobi
--by magu aka noppa

--music from picotunes
--by gruber

-------------------------------
    --initializations
-------------------------------

    --entry point
function _init()
--persistent high score
cartdata("shelled_shinobi_1")

--copy protekk
pirate = true
urls = { 0, "uploads.ungrounded.net", "v6p9d9t4.ssl.hwcdn.net", "files.crazygames.com", "prod-dpgames.crazygames.com", "www.lexaloffle.com"}
for url in all(urls) do
    if (stat(102) == url) pirate = false
    end

    fps_60 = true
--speed etc factor for 60 fps
    fps_f = fps_60 and 2 or 1

entry_init()

--add menu options
menuitem(1, "zone 1: skyline", load_lvl0)
menuitem(4, "swap ❎/🅾️ input", swap_input)
menuitem(5, "toggle timer hud", toggle_timer)

--hud
show_timer = false
show_pickup_hud = true

--configurable input
jump_input = 4
shell_input = 5

--springs: idx = lvl
springs = {}

--logo
logo_sp = 198
logo_w = 8
logo_h = 4

--first state
if pirate then
print(stat(102), 0, 90, 8)
print("not approved.", 0, 100)
print("play at", 0, 110, 11)
print("noppa.itch.io/shelled-shinobi", 0, 120)
    elseif test_sewers then
load_lvl2()
    elseif test_lvl3 then
load_lvl3()
    elseif test_lvl1 then
load_lvl1()
    else
init_menu()
end
if test_end then
plr.x = map_end - 16
plr.y -= 8
end
end

function entry_init()
test_end = false
test_lvl1 = false
test_sewers = false
test_lvl3 = false

--levels: 0(start), 1, 2(sewers), 3, 4(end)
lvl = 0

--camera
cam_x = 0
cam_y = 0
--camera window, as offset from player
cam_box_ofs = 8
lerp_factor = .2 / fps_f

--parallax background
bg_x = 112 -- x cell of bg start
bg_y = 10 -- y "
bg_w = 16 -- width(cells)
bg_h = 4 -- height
bg_speed = .5 -- move speed compared to foreground
bg_cam_x = 0 -- camera offset

--scene transition effect timer
fadeout = 0
fade_dt = 0

elapsed_time = 0 --on - screen timer
from_start = true --set false if start from lvl > 0
menu_time = 0 --decreased from playtime at game win
end

function set_lvl_values(_px, _py, _cx, _cy, _me, _ms)
plr.x = _px
plr.y = _py
bg_cam_x = _cx
cam_x = _cx
cam_y = _cy
map_end = _me
map_start = _ms or 0
lvl += 1
borders = {}
scanned_lvl = false
init_water()
make_stars()
end

function load_game()
music(31, 900, 2)
init_game()
end

function load_lvl0()
if test_sewers then
load_lvl2()
    elseif test_lvl3 then
load_lvl3()
    else
entry_init()
load_game()
end
end

function load_lvl1()
entry_init()
load_game()
set_lvl_values(8, 104, 0, 256, 576)
from_start = false
init_lvl1_objects()
end

function load_lvl2()
entry_init()
load_game()
lvl = 1--+=1 next line
set_lvl_values(56, 114, 0, 128, 1024)
from_start = false
music(16)
end

function load_lvl3()
entry_init()
from_start = false
load_game()
lvl = 2 --+=1 next line
set_lvl_values(616, 112, 576, 256, 1024, 576)
end

--timer menu option
function toggle_timer()
show_timer = (not show_timer)
end

--swap input keys / buttons
function swap_input()
jump_input, shell_input = shell_input, jump_input
end

--title screen
function init_menu()
music(43, 900)

--big spraycan
can_sp = 206
can_w = 2
can_h = 4

start_txt1 = "PRESS"
start_txt2 = "TO START"

--scrolling credits
credits = "  -  sHELLED sHINOBI  -  A GAME BY MAGU  -  mUSIC FROM pICO-8 tUNES vOL. 1 & 2 BY gRUBER (REMIX: MAGU)"
cred_ofs = 0

--star background
map_start = 0
map_end = 128
make_stars()

if fps_60 then
_update60 = update_menu
    else
_update = update_menu
end
_draw = draw_menu
end

--generic game object constructor
function new_obj(x, y, sp, anim, first, last)
return {
    x=x,
    y=y,
    sp=sp,
    anim=anim,
    first=first,
    last=last
}
end

function init_game()
if fps_60 then
_update60 = update_game
    else
_update = update_game
end
_draw = draw_game

jump_input_down = false
shell_input_down = false

--physics
steps = fps_60 and 4 or 8 -- simulation done in steps per frame
gravity = fps_60 and .11 or .4
default_friction = fps_60 and .925 or 0.85
default_max_dx = 2 / fps_f
shell_slide_min = 1.4 / fps_f
shelled_friction = fps_60 and 1.075 or 1.15
shelled_max_dx = 4 / fps_f--also horizontal springjumping max dx
default_max_dy = fps_60 and 2.35 or 4.5
falling_max_dy = fps_60 and 4 or 8
springjump_max_dy = fps_60 and 3 or 6
wallslide_max_dy = .5 / fps_f
walljump_max_dy = 3.5 / fps_f
default_boost = fps_60 and 2.35 or 4.5
walljump_boost = default_boost * (fps_f and 1 or .8)
wall_stick_max = 6 * fps_f * steps
wall_stick = wall_stick_max--how much stick left
walljump_max_dx = 2.4 / fps_f

--player
plr = {
    x=56,
    y=104,
    w=8,
    h=8,
    sp=14,
    flp=false,
    dx=0,
    dy=0,
    max_dx=default_max_dx,
    max_dy=default_max_dy,
    acc=.5 / fps_f,
    boost=default_boost,
    anim=0,
    running=false,
    jumping=false,
    falling=false,
    sliding=false,
    landed=true,--default true for outline drawing
        landing = false,
    shelled = true,
    submerged = false,
    wallsliding = false,
    walljumping = false,
    springjumping = false
    }

--jumping grace frames,
    --reduced by 1 per physics step when falling
--first steps * frames reduced before next input
grace_max = 2.5 * fps_f * steps-- refreshed when player landed
grace_left = grace_max-- how many frames of grace left
was_landed = false -- was the player on solid ground between now and the last jump

--jump buffer frames,
    --reduced by 1 per physics step
jump_buffer = 0 -- how many frames of buffer left
jump_buffer_max = 4 * fps_f * steps-- refreshed with player jump input

--prevent walljump spamming
walljump_delay = 0
walljump_delay_max = 10 * steps * fps_f-- frames / steps

--map limits
map_start = 0
map_end = 760
if (lvl > 1) map_end = 1024

--background stars
bg_cam_ofs = 0
make_stars()

--dynamically colored tiles
--border wall x - coordinates
borders = { 296, 488, 752, 532}--the 4th is not a light wall

doors = {
    new_obj(borders[1], 104, 119, 0, 119, 126),
    new_obj(borders[2], 8, 119, 0, 119, 126),
    new_obj(borders[3], 104, 119, 0, 119, 126)
}
--make sure the doors are closed when reloading
set_doors()

switches = { --a.k.a buttons
new_obj(borders[1] - 16, 16, 58, 0, 59, 60),
    new_obj(borders[1] + 48, 24, 61, 0, 62, 63),
    new_obj(borders[3] - 16, 32, 58, 0, 59, 60)
    }
pressed = 0--how many pressed

--water
water_sp = 96

pizza = {
    sp=224,
    x=832,
    y=79,
    w=10,
    h=10
}

slide_gfx = {
    sp=22,
    anim=0,
    first=22,
    last=25
}

--gfx when shell bounces off a wall
ricochet = new_obj(0, 0, 0, 0, 18, 21)
empty_sp = 253--to make ricochet disappear

--(not particle system) dust fx
dust_x = 0
dust_y = 0
dust2_x = 0
dust2_y = 0
dust_max = 1
dust_size = dust_max
dust_anim = 0

--particles
particles = {}

pickups = {}
pickup_total = 0
collected = 0
scanned_lvl = false

pickup = {
    sp=37,
    anim=0,
    first=37,
    last=42
}

--boost directions for different spring sprites
    spring_dirs = { [120]= "up", [121]= "down" }
coiled_max = 6 * fps_f--frames spring stays coiled
was_springjumping = 0

--crates
crate_sp = 79
crate_hit_sp = 229
crate_time_max = 4 * fps_f--max reaction time
crates_hit = {}

--tutorial and win state
has_jumped = false
has_shelled = false
game_won = false
win_time = 0

--reset fadeout timers
fadeout = 0
fade_dt = 0

--win screen visibility
win_screen = false

--sfx
interact_sfx = 0
jump_sfx = 1
land_sfx = 53--3
win_sfx = 4
door_sfx = 5
ricochet_sfx = 9
slide_sfx = 10
shelled_slide_sfx = 11
shelling_sfx = 21
pickup_sfx = 22
eat_sfx = 23
end

function set_doors()
for d in all(doors) do
    mset(d.x / 8, d.y / 8, d.sp)
    end
end

function init_lvl1_objects()
    local x_ofs = 304
borders = { 480-x_ofs, 872-x_ofs,- 8}--final entry not a light wall

doors = {
    new_obj(borders[1], 48+cam_y, 119, 0, 119, 126),
    new_obj(borders[1], 104+cam_y, 119, 0, 119, 126),
    new_obj(borders[2], 104+cam_y, 119, 0, 119, 126)
}
set_doors()

switches = {
    new_obj(8,16+ cam_y, 61, 0, 62, 63),
new_obj(borders[2] - 16, 8 + cam_y, 58, 0, 59, 60)
    }
pressed = 0
end

function init_water()
water = {}
water_y = cam_y + 112
water_x_ofs = lvl == 2 and 2 or 6
water_colors = { 3, 3, 3, 11, 11, 11, 11}
water_offsets = {}
for i = 0, 7 do
    add(water_offsets, rnd())
    end
end

--> 8
-------------------------------
    --general updates
-------------------------------

    --returns true when done fading out
function update_fadeout()
if fadeout > 0 then
fade_dt = t() - fadeout
return (fade_dt >= 2.2)
end
return false
end

function update_menu()
--fade out title screen
if btnp(1) and fadeout == 0 then
music(31, 900, 2)
sfx(interact_sfx, 3)
fadeout = t()
end
if (update_fadeout()) init_game()
end

function update_win()
if btn(4) and btn(5) and fadeout == 0 then
fadeout = t()
sfx(interact_sfx, 3)
end
if update_fadeout() then
entry_init()
init_menu()
camera(cam_x, cam_y)
end
end

function update_game()
--transition to win screen
if game_won and update_fadeout() then
if fps_60 then
_update60 = update_win
        else
_update = update_win
end
_draw = draw_win
fadeout = 0
fade_dt = 0
win_screen = true
    else
--menu time to be deducted from play time
if (menu_time == 0) menu_time = t()

--update hud - timer
if (not game_won) elapsed_time = t() - menu_time

--scan the map for objects
        if not scanned_lvl then
scan_objects()
if (lvl == 2 or lvl == 3) scan_water(0)
end

--update player and springs(that can make player jump)
plr_update()
plr_animate()

--sfx
land_sfx = lvl == 2 and 59 or 53

--doors and switches
update_doors()

--animate pickups
next_frame(pickup, pickup.first, pickup.last, 0.5 / fps_f)

--crates
update_crates()

--non - particle system dust fx
update_dust()

--wallslide fx
if plr.wallsliding and not plr.jumping then
if (sin(t()) < .9 and rnd() < (fps_60 and .5 or .9)) or #particles == 0 then
spawn_goo(plr.x, plr.y + plr.h)
end
end

--particles
update_particles()

--camera and parallax background scrolling
update_camera()
end
end

function update_crates()
for obj in all(crates_hit) do
    if obj.react_time > 0 then
            obj.react_time -= 1
        else
del(crates_hit, obj)
end
end
end

--if a spring collides with the player, do a spring jump
function update_springs()
    local did_jump = false
for s in all(springs[lvl]) do
        local dir = spring_dirs[s.sp]
        local y_ofs = (dir == "up") and 5 or 0
        local spring_hitbox = {
    x=s.x * 8,
    y=s.y * 8 - cam_y + y_ofs,
    w=8,
    h=2
}
        local plr_hitbox = {
    x=plr.x + 1,
    y=plr.y,
    w=plr.w - 2,
    h=plr.h
}
if collide_entity(spring_hitbox, plr_hitbox) then
if not behind_spring(dir) then
plr_springjump(dir)
                local _c = lvl == 2 and { 2 } or { 4, 5 }
if (s.coiled < coiled_max) spawn_dust(s.x * 8 + 3, s.y * 8 - cam_y + y_ofs, false, 1, _c)
s.coiled = coiled_max--spring to be drawn as coiled for duration of coiled_max
                did_jump = true
end
        elseif s.coiled > 0 then
--reduce time left as coiled
s.coiled -= 1 / steps
end
end
if (did_jump) was_springjumping = fps_60 and 3 or 1
end

--animate switches, open doors
function update_doors()
for i = 1, #switches do
        local _s = switches[i]
        if pressed < i then
--animate switches
next_frame(_s, _s.first, _s.last, 0.05)
        else
--open doors
door_animate(doors[i])
--lvl 1 room 1 has 2 doors
if (lvl == 1) door_animate(doors[i + 1])
end
end
end

function update_camera()
    local old_x = cam_x
    local new_x = flr(plr.x) - 64 + (plr.w / 2)

--abruptly transitioning, small lookahead
if plr.shelled and abs(plr.dx) > shell_slide_min then
if plr.flp then
new_x -= cam_box_ofs * 2
        else
new_x += cam_box_ofs * 2
end
end

--camera window
if abs(new_x - old_x) >= cam_box_ofs
    and abs(plr.dx) >= (fps_60 and .8 or 1)
    and sgn(new_x - old_x) == sgn(plr.dx) then
--lerp formula: (1 - c) * a + c * b
        local lerp_cam_x = (1 - lerp_factor) * old_x + lerp_factor * new_x
if lerp_cam_x <= map_start then
cam_x = map_start
        elseif lerp_cam_x >= map_end - 128 then
cam_x = map_end - 128
        else
if cam_x < lerp_cam_x then
cam_x = flr(lerp_cam_x)
            else
cam_x = ceil(lerp_cam_x)
end

--parallax bg
if lvl != 2 then
if cam_x > (bg_cam_x + (bg_w * 8))
                or cam_x < bg_cam_x - (bg_w * 8) then
bg_cam_x = cam_x
end
if cam_x > map_start + 1 and old_x > 0 and cam_x < map_end - 128 and plr.dx != 0 then
if fps_60 then
bg_cam_ofs = (bg_speed * (cam_x - old_x))
                    elseif plr.dx > 0 then
bg_cam_ofs = flr(bg_speed * (cam_x - old_x))
                    elseif plr.dx < 0 then
bg_cam_ofs = ceil(bg_speed * (cam_x - old_x))
end
bg_cam_x += bg_cam_ofs
foreach(stars, update_star)
foreach(big_stars, update_star)
end
end
end
end
camera(cam_x, cam_y)
end

--scan playable area for pickups, springs and(not) water
function scan_objects()
for i = (map_start / 8) + 1, (map_end / 8) - 2 do
    for j = (cam_y / 8), (cam_y / 8) + 14 do
          local sp = mget(i, j)
      if fget(sp, 4) then
--in map: sp 227
add_pickup(i, j)
            elseif fget(sp, 6) then
add_spring(i, j, sp)
            elseif sp == crate_hit_sp then
--reset broken crates
mset(i, j, crate_sp)
end
end
end
scanned_lvl = true
end

function add_pickup(_x, _y)
add(pickups, { x=_x, y=_y })
pickup_total += 1
end

function add_spring(_x, _y, _sp)
if (not springs[lvl]) springs[lvl] = {}
add(springs[lvl], { x=_x, y=_y, sp=_sp, coiled=0 })
--springs are drawn as sprites so remove from map calls
mset(_x, _y, 0)
end

--scan all floor tiles that don't have the "not_flag",
--meaning the tiles are empty / not solid, add water there
function scan_water(not_flag)
for i = (map_start / 8) + water_x_ofs, (map_end / 8) - 2 do
    local j = (cam_y / 8) + 14
      local sp = mget(i, j)
if not fget(sp, not_flag) then
add(water, i * 8)
end
end
end

function spawn_ricochet()
if not plr.submerged then
sfx(ricochet_sfx, 3)
ricochet.sp = ricochet.first
if plr.dx < 0 then
ricochet.x = plr.x - 3
        else
ricochet.x = plr.x + 4
end
ricochet.y = plr.y
end
end

--conditional channel blocking sfx
function b_sfx(_sfx)
    local _ch = stat(23) < 0 and 3 or(lvl == 2 and 0 or - 1)
sfx(_sfx, _ch)
end

--> 8
-------------------------------
    --drawing
-------------------------------
    function draw_menu()
    cls()
--star background and mask shapes
draw_stars()
circfill(64, 56, 32, 0)
circfill(47, 38, 16, 0)
circfill(81, 42, 16, 0)
--logo
draw_outline(draw_logo, 0, 3)
draw_logo()
--spraycans
draw_outline(draw_spraycans, 0, 2)
draw_spraycans()
--background
pal(1, 1 + 128, 1)
map(bg_x, bg_y, bg_cam_x, 80, bg_w, bg_h)
pal(1, 1)
rectfill(0, 112, 128, 119, 1)
--start instructions
print(start_txt1, 50, 67, 13)
print(start_txt2, 49, 74, 13)
--arrow
spr(46, 72, 65)
--flashing highlight
if t() % 1 < .5 then
pal(13, 7)
spr(46, 72, 65)
pal(13, 13)
end
--pause / options instructions
pause_instructions()
--credits
draw_credits()
--on - screen timer
if (show_timer) print_time(elapsed_time, cam_x + 74, 120)
--fadeout
if (fadeout > 0) draw_fadeout()
end

function draw_logo()
spr(logo_sp, cam_x + 34, 24, logo_w, logo_h)
end

function draw_spraycans()
spr(can_sp, 19, 55, can_w, can_h, 1)
spr(can_sp, 94, 55, can_w, can_h)
end

function draw_fadeout()
if fadeout > 0 then
if fade_dt < 2.2 then
circfill(64 + cam_x, 64, fade_dt * 30 * fade_dt, 0)
        else
cls()
end
end
end

function pause_instructions()
    local _str = "PAUSE MENU"
    local _x = center_txt(_str) + 12 + cam_x--string x
    local _sx = 44 + cam_x--symbol x
    local _y = cam_y + 109
--pause symbol
rect(_sx, _y + 1, _sx + 5, _y + 4, 13)
rect(_sx - 1, _y + 2, _sx + 6, _y + 3)
--pause instructions
print("P/", 35 + cam_x, _y)
print(_str, _x, _y)
end

function draw_game()
cls()
pal()-- reset pal when loading from > lvl1
--level dependent drawing
if lvl == 2 then
--palette swap for upper part of the screen
sewer_pal()
map(0, cam_y / 8, 0, cam_y, (map_end / 8), 16)--some unnecessary solid tile draws
--maroon highlight line for lower sewer floor tiles
line(cam_x, 125 + cam_y, cam_x + 128, 125 + cam_y, 6)
--part of palette to default
sewer_pal_back()
--grey shadow line for upper floor sewer tiles
line(cam_x, 115 + cam_y, cam_x + 128, 115 + cam_y, 5)
    else
--background
draw_stars()
if lvl > 2 then
pal(13, 13 + 128, 1)
pal(6, 6 + 128, 1)
pal(5, 5 + 128, 1)
--sewer exit background
rectfill(map_start + 31, 14 * 8 + cam_y, map_start + 48, 16 * 8 + cam_y, 1)
end
--scrolling bg, originally based on a doc_robs tutorial
map(bg_x, bg_y, bg_cam_x - (8 * bg_w), 80 + cam_y, bg_w, bg_h)
map(bg_x, bg_y, bg_cam_x, 80 + cam_y, bg_w, bg_h)
map(bg_x, bg_y, bg_cam_x + (8 * bg_w), 80 + cam_y, bg_w, bg_h)
pal(1, 1)
--foreground
pal(15, 15 + 128, 1)
pal(1, 1 + 128, 1)
map(0, cam_y / 8, 0, cam_y, (map_end / 8), 16)

--crates
draw_crates()
end

if lvl == 4 then
--pizza
draw_outline(draw_pizza, 0)
draw_pizza()
    elseif lvl < 2 then
--button instructions
draw_tutorial()
--doors and switches
draw_border_objects()
    else
--water body
draw_water()
end

--level independent and top layer drawing
--player(outlined)
draw_plr()

--water highlight
if (lvl == 2 or lvl == 3) draw_water_hl()

--redraw sewer upper solid tiles
if lvl == 2 then
sewer_pal()
map(0, cam_y / 8 + 1, 0, 8, (map_end / 8), 13, 0x22)
sewer_pal_back()
end
--springs
draw_springs()
--pickups
draw_pickups()
--non - particlesystem fx
draw_fx()
all_colors_to()
--particles
draw_particles()
--win, time, pickup hud
draw_hud()
--fadeout
if (game_won) draw_fadeout()
end

function sewer_pal()
pal(5, 5 + 128, 1)
pal(6, 2)
pal(5, 1)
pal(7, 8)
pal(13, 5)
end

--reset some of the changed colors
function sewer_pal_back()
pal(2, 2)
pal(6, 6)
pal(7, 7)
pal(13, 13)
pal(5, 5)
end

function draw_tutorial()
    local x_txt = "x/❎"
    local o_txt = "z/🅾️"
    local shelling_txt = x_txt
    local jumping_txt = o_txt
if jump_input == 5 then
shelling_txt = o_txt
jumping_txt = x_txt
end
print(shelling_txt, 52, 96, 13)
print(jumping_txt, 260, 64, 13)
if t() % 1 < .5 then
if not has_shelled then
print(shelling_txt, 52, 96, 7)
end
if not has_jumped then
print(jumping_txt, 260, 64, 7)
end
end
end

function draw_border_objects()
for obj in all(switches) do
    mset(obj.x / 8, obj.y / 8, obj.sp)
    end
    for i = 1, pressed do
    pal(8, 3)
        pal(14, 11)
        local x = borders[i]
map(x / 8, 0, x, 0, 1, 105)
draw_door(i)
--lvl 1 room 1 has 2 doors
if (lvl == 1) draw_door(i + 1)
pal(8, 8)
pal(14, 14)
end
end

function draw_plr()
    local function drw()
        local y_offset = plr.submerged and 1 or 0
spr(plr.sp, plr.x, plr.y + y_offset, 1, 1, plr.flp)
end

    local line_color = 0
if plr.submerged then
line_color = lvl == 2 and 1 or 5
clip(0, plr.y, plr.x + 9, 9)
    elseif plr.landed then-- don't draw bottom outline
clip(0, 0, map_end, plr.y + 8)
end
draw_outline(drw, line_color)
clip()

if plr.submerged then
pal({ 5, 0, 3, 13, 13, 13, 6, 13, 6, 0, 13, 0, 0, 3})--thanks to paranoidcactus for pal inspiration
        shell_pal(6, 13)
        drw()
all_colors_to()
    else
shell_pal(9, 4)
drw()
end
end

--highlight
function shell_pal(_cl, _cr)
if (plr.flp) _cl, _cr = _cr, _cl
pal({ [10]= _cl, [12]= _cr })
end

function draw_pickups()
for i, p in pairs(pickups) do
    spr(pickup.sp, p.x * 8, (p.y * 8) + wave(i, 1) - cam_y)
    end
end

--ricochet, running dust, shelled slide fx
function draw_fx()
--fx to underwater color
if plr.submerged then
        local fx_col = lvl == 2 and 11 or 13
all_colors_to(fx_col)
ricochet.sp = empty_sp
--ricochet fx
    elseif ricochet.sp >= 1 then
next_frame(ricochet, empty_sp, ricochet.last, .9 / fps_f)
spr(ricochet.sp, ricochet.x, ricochet.y)
end

    local function draw_dust(offset)
if (lvl == 2) pal(6, 6 + 128, 1)
color(6)
circfill(dust_x + offset, dust_y, dust_size)
if abs(dust_size) < 1 then
rectfill(dust2_x + offset, dust2_y, dust2_x + offset + dust_size, dust2_y + dust_size)
        elseif dust_size == -1 then
rectfill(dust2_x + offset, dust2_y, dust2_x + offset + dust_size + 1, dust2_y + dust_size + 1)
end
pal(6, 6)
end

    local abs_dx = abs(plr.dx)
if abs_dx < .2 and dust_size > 0 then
dust_size = 0
end
if plr.landed and abs_dx > .6 then
if plr.sliding and not plr.shelled then
if plr.dx > 0 then
offset = 8
            else
offset = -8
end
--normalslide dust
draw_dust(offset)
end
--running or shelled sliding dust
draw_dust(0)
--shelled slide sparkles
if plr.shelled and abs_dx > shell_slide_min then
spr(slide_gfx.sp, plr.x, plr.y + (plr.submerged and 1 or 0), 1, 1, plr.flp)
end
    else
dust_size = dust_max
end
end

--swap and reset palette in lvl 3
function water_pal(swap)
if (lvl == 3) pal({ [3]= swap and 1 or 3, [11]= swap and 13 or 11})
end

--water body
function draw_water()
water_pal(true)
for wx in all(water) do
    spr(water_sp, wx, water_y + 1)
    end
    water_pal()
end

--highlight based on platformer starter kit by krajzeg
function draw_water_hl()
water_pal(true)
for wx in all(water) do
    if abs(wx - plr.x) < 128 then
            for i = 0, 7 do
                local _sine = flr(sin(t() + water_offsets[i + 1]) * 3 + 4)
                local x_ofs = plr.flp and - 1 or 0
if plr.y > water_y - cam_y - 24
                and wx + i > plr.x + x_ofs
                and wx + i - 6 - x_ofs < plr.x then
_sine = plr.submerged and 6 or 1
end
pset(wx + i, water_y - cam_y, water_colors[_sine])
end
        else
line(wx, water_y - cam_y, wx + 7, water_y - cam_y, 3)
end
end
water_pal()
end

function draw_springs()
if lvl == 2 then
pal(4, 2)
pal(7, 14)
pal(15, 8)
end
for s in all(springs[lvl]) do
        local n = s.sp
        local x = s.x * 8
        local y = s.y * 8 - cam_y
--wider and thinner sprites on coiled
if (s.coiled > 0) then
            local dir = spring_dirs[n]
            local h = 8
            local w = 12
if dir == "down" then
clip(0, y, map_end, 112)
y -= 1
            elseif dir == "up" then
clip(0, 0, map_end, y + 8)
y += 1
end
x -= 2
sspr(8 * (n % 16), 8 * flr(n / 16), 8, 8, x, y, w, h)--first 2 args based on zspr by matt
clip()
        else
--draw spring sprites normally when idle
spr(n, x, y)
end
end
if lvl == 2 then
pal(4, 4)
pal(7, 7)
pal(15, 15)
end
end

--crate hit effect
function draw_crates()
clip(0, 8, map_end, 114)
for obj in all(crates_hit) do
    if obj.react_time > 0 then
            local _x = obj.x * 8
            local _y = obj.y * 8
--hit coordinates to even tile
_y -= (_y - 8) % 8
_x -= (_x - 8) % 8
--hide map tile
rectfill(_x, _y, _x + 7, _y + 7, 0)
--offset and scale
_x += obj.dir == "right" and 3 or(obj.dir == "left" and 1 or 0)
            local w = obj.dir == "up" and 10 or 6
            local h = obj.dir == "up" and 6 or 10
            local n = (obj.react_time < 2) and crate_hit_sp or crate_sp
sspr(8 * (n % 16), 8 * flr(n / 16), 8, 8, _x - 1, _y - 1, w, h)
end
end
clip()
end

--using the old anim method just to offset the 1st sprite
function draw_door(i)
if i <= #doors then
        local d = doors[i]
        local offset = d.sp - d.first
if d.sp < d.last then
clip(0, d.y, d.x + 9, 9)
spr(d.first, d.x, d.y - offset)
clip()
end
end
end

function draw_pizza(_x, _y)
if (not(_x or _y)) _x, _y = pizza.x, pizza.y
spr(pizza.sp, _x - (1 / fps_f) * cos((t() + .01)), _y + ((1 / fps_f) * sin(t())))
end

function draw_credits()
    local _y = cam_y + 122
print(credits, -cred_ofs, _y, 1)
print(credits, -cred_ofs + #credits * 4, _y)
cred_ofs += 1 / fps_f
if (cred_ofs >= #credits * 4) cred_ofs = 0
end

--win, time, pickup hud
function draw_hud()
if show_pickup_hud or win_screen then--or game_won
        local _c = from_start and 1 or 2
        local _ofs_y = win_screen and cam_y - 31 or 0
        local _x = cam_x
if (win_screen) _x += (collected < 10 and 49) or(collected < 100 and 47) or 45
rectfill(_x + 2, 118 + _ofs_y, _x + 6, 125 + _ofs_y, _c)
spr(pickup.first, _x + 1, 118 + _ofs_y)
end
if (not win_screen and show_pickup_hud) hud_txt(collected, cam_x + 10, 120)
if (not win_screen and show_timer) print_time(elapsed_time, 74, 120)
end

function hud_txt(txt, x, y)
    local out_c = from_start and 1 or 2
    local fill_c = lvl > 1 and 7 or 6
outline_txt(txt, x, y, out_c, fill_c)
end

--txt_x = top left
function outline_txt(txt, x, y, out_c, fill_c)
color(out_c)
print(txt, x - 1, y - 1)
print(txt, x, y - 1)
print(txt, x + 1, y - 1)
print(txt, x + 1, y)
print(txt, x + 1, y + 1)
print(txt, x, y + 1)
print(txt, x - 1, y + 1)
print(txt, x - 1, y)
color(fill_c)
print(txt, x, y)
end

function format_time(t)
    local _min = flr(t / 60)
    local _min_zero = _min < 10 and "0" or ""
    local _sec = t - (_min * 60)
    local _fract = ""
--round hud timer to 1st decimal
if (not win_screen or fade_dt > 2.2) then
_sec = flr(_sec * 10 + 0.5) / 10
if (_sec % 1 == 0) _fract = ".0"
end
    local _sec_zero = _sec < 10 and "0" or ""
    local _str = _min_zero..tostr(_min)..":".._sec_zero..tostr(_sec).._fract
return _str
end

--display run time
--call with x = nil to center text
function print_time(t, x, y)
    local _str = "tIME:"..format_time(t)
x = x or center_txt(_str)
hud_txt(_str, x + cam_x, y)
end

--set and display personal fastest time recorded
function high_score()
    local hi = dget(0)
if (hi != 0 or from_start) then
if (from_start and(hi == 0 or win_time < hi)) dset(0, win_time)
        local _str = "bEST:"..format_time(dget(0))
outline_txt(_str, center_txt(_str) + cam_x, cam_y + 76, 1, 3)
end
end

--from trasevol dog
--calling with no parameters resets it
function all_colors_to(c)
if c then
for i = 0, 15 do
    pal(i, c)
  end
 else
for i = 0, 15 do
    pal(i, i)
  end
 end
end

--based on function by trasevol dog
-- 'draw': function callback
-- 'c': outline color
-- 'w': line width, default 1
function draw_outline(draw, c, w)
all_colors_to(c)
w = w or 1
for i = 1, w do
    camera(cam_x - i, 0)
        draw()
        camera(cam_x + i, 0)
draw()
camera(cam_x, -i)
draw()
camera(cam_x, i)
draw()
end
camera(cam_x, 0)
all_colors_to()
end

--win screen
function draw_win()
cls()
if win_screen then
pal()
pal(1, 1 + 128, 1)
pal(13, 1)
pal(15, 15 + 128, 1)
end

--tile bg framing
map(112, 0, cam_x, cam_y + 16, 16, 10)
pal(13, 13)

--logo
draw_logo()

--signature
print("MAGU", 113 + cam_x, 123 + cam_y, 1)

--button instructions
camera(cam_x, cam_y + 4)--temp hack for y - alignment
    local _str = "❎+🅾️ RETURN TO TITLE"
    print(_str, center_txt(_str) - 3 + cam_x, 119 + cam_y, 13)
pause_instructions()
camera(cam_x, cam_y)

--win - specific ui txt
win_txt()
    local _x = collected < 10 and 58 or collected < 100 and 56 or 54
hud_txt(collected.."/"..pickup_total, cam_x + _x, 89 + cam_y)
print_time(win_time, nil, 64 + cam_y)
high_score()

--pickup hud
draw_hud()

--pizza
draw_pizza(cam_x + 32, 8)
draw_pizza(cam_x + 89, 8)

--fadeout
if (not win_screen) camera(0, 0)
if (fadeout > 0) draw_fadeout()
camera(cam_x, cam_y)
end

--based on wave text by tashnettrash
function win_txt()
    local _str = "you win!"
for _c in all({ 4, 10, 7, 15, 9}) do
    for j = 0, #_str do
            local _wy = 8 + wave(j, 5)
            if (_c == 4) _wy += 1
if (_c == 7) clip(0, 0, 128, _wy + 1)
if (_c == 15) clip(0, _wy + 3, 128, _wy + 4)
if (_c == 9) clip(0, _wy + 4, 128, _wy + 5)
print(sub(_str, j, j), cam_x + center_txt(_str) + (j * 4) - 2 * (cos((t() + .01))) - 2, _wy + cam_y, _c)
clip()
end
end
end

--wave offset
--25=speed
function wave(i, h)
return sin((t() * 20 + i) / 25) * h
end

--center align text horizontally
function center_txt(_str)
return 64 - #_str * 2
end

--> 8
-------------------------------
    --collision checking
-------------------------------

    function collide_entity(_self, _other)
    return _other.x < _self.x + _self.w and _self.x < _other.x + _other.w
        and _other.y < _self.y + _self.h and _self.y < _other.y + _other.h
end

--obj = table needs x, y, w, h
--flags: 0 = walkable, 1 = impassable, 2 =switch, 3 = crate, 4 = pickup, 5 = wallslime, 6 = spring
function collide_map(obj, dir, flag)
--no roof to lvl 1
if (lvl == 1 and flag != 4 and obj.y < 1 and(obj.y < -1 or dir != "down")) return false

    local x = obj.x local y = obj.y + cam_y
    local w = obj.w local h = obj.h

if dir == "left" then
x1 = x - 1             y1 = y
x2 = x                y2 = y + h - 1

    elseif dir == "right" then
x1 = x + w - 1        y1 = y
x2 = x + w            y2 = y + h - 1

    elseif dir == "up" then
x1 = x + 2             y1 = y - 1
x2 = x + w - 3        y2 = y

    elseif dir == "down" then
x1 = x + 2             y1 = y + h
x2 = x + w - 3        y2 = y + h
end

--pixels to tiles
x1 /= 8        y1 /= 8
x2 /= 8        y2 /= 8

    local tiles = {{ x1, y1 }, { x1, y2 }, { x2, y1 }, { x2, y2 }}
for t in all(tiles) do
        local tx, ty = t[1], t[2]
        if fget(mget(tx, ty), flag) then
if (flag == 4) remove_pickup(tx, ty)
if (flag == 3) hit_crate(tx, ty, dir)
return true
end
end
end

--stop player from going over or inside of walls when near or above cam_y
--returns boolean for collision
function lvl_boundary(x, y)
    if y < 3 then
for i = 1, #borders do
            local x_ofs = (lvl == 0 and i == 1) and 32 or 0 --lvl 0, room 2 upper left border is further away
if x <= borders[i] + 16 + x_ofs and x >= borders[i] - 12 then
plr.x += (sgn(plr.dx)) * -6 --push away
return true
end
end
end
return false
end

--> 8
-------------------------------
    --player update and input
-------------------------------

    function handle_input()
    if not plr.shelled then
if btn(0) then
update_dx(-1)
plr.flp = true
        elseif btn(1) then
update_dx(1)
plr.flp = false
end
end

--shelling
--thanks to celeste.p8's noel & matt for input logic reference
    local shell = btn(shell_input) and not shell_input_down
shell_input_down = btn(shell_input)
if shell then
plr.shelled = not plr.shelled
b_sfx(shelling_sfx)
has_shelled = true
end

--jump
    local jump = btn(jump_input) and not jump_input_down
jump_input_down = btn(jump_input)
if jump then
--reset jumping buffer
jump_buffer = jump_buffer_max
--jump if landed or in coyote time
if (plr.landed
        or(grace_left > 0 and was_landed)) then
plr_jump(plr.boost)
spawn_dust(plr.x, plr.y + 6, plr.flp, 2)
        else
plr_walljump()
end
    elseif jump_buffer > 0 then
if plr.landed then
plr_jump(plr.boost)
spawn_dust(plr.x, plr.y + 6, plr.flp, 2)
        else
plr_walljump()
end
end
end

--assumes player is wallsliding
function stick_aligned(_wall_dir)
    local offset = .1
    local dir_name = "left"
if _wall_dir == 1 then
offset = -.1
dir_name = "right"
end
    local colliding = false
while collide_map(plr, dir_name, 1) do
    plr.x += offset
        colliding = true
    end
if colliding then
plr.x -= offset * 10
plr.dx = 0 --stick to wall
end
end

function plr_ground_collision()
plr.landed = true
plr.falling = false
if (not plr.springjumping) plr.y -= ((plr.y + plr.h + 1) % 8) - 1 --pop up to tile
if plr.landed and plr.landing and not plr.submerged then
sfx(land_sfx, 2)
plr.landing = false
spawn_dust(plr.x, plr.y + plr.h)
spawn_dust(plr.x, plr.y + plr.h, true)
end
plr.dy = 0
grace_left = grace_max
was_landed = true
end

function plr_x_collision()
if plr.shelled then
if (wallslide_direction() == -1) then
--ricochet
spawn_ricochet()
plr.dx *= -1
        else
--wallslide
b_sfx(slide_sfx)
plr.shelled = false
end
plr.flp = not plr.flp
    else
plr.dx = 0
plr.running = false
end
end

--update player - dependent stuff
function plr_update()
--update physics parameters
if plr.shelled and abs(plr.dx) > shell_slide_min then
plr.dx *= shelled_friction
plr.max_dx = shelled_max_dx
    else
plr.dx *= default_friction
--increased max - dx for better walljump push - away
        if plr.walljumping then
plr.max_dx = walljump_max_dx
        else
plr.max_dx = default_max_dx
end
end
if plr.submerged then
--more friction, lower jump under water
plr.dx *= (fps_60 and(plr.shelled and .925 or .75)) or .85
plr.boost = default_boost
    elseif not plr.walljumping and not plr.springjumping then
plr.boost = default_boost
plr.max_dy = default_max_dy
end
plr.dy += gravity

--controls
handle_input()

--physics simulation done in steps per frame
for i = 1, steps do
    --reduce jump buffer
jump_buffer = max(0, jump_buffer - 1)
--reduce walljump delay
if (walljump_delay > 0) walljump_delay -= 1
--fix sewer glitch
if lvl == 2 and plr.shelled and plr.y < 8 then
plr.y = 8
end
--update wallslide
        local wall_dir = wallslide_direction()
        local was_wallsliding = plr.wallsliding
plr.wallsliding = (wall_dir != -1)
if (plr.wallsliding and not was_wallsliding) b_sfx(slide_sfx)

--update walljump velocity
if plr.dy > (fps_60 and 0 or - 1) then
plr.walljumping = false
        elseif plr.walljumping and abs(plr.dx) > 0 and i == 1 then
update_dx(sgn(plr.dx))
--flip sprite if plr stops input aganst wall mid flight
if (not(btn(0) or btn(1))) plr.flp = (plr.dx <= 0)
end

--check for springjump
        update_springs()

        --check collision up and down
if plr.dy > 0 then
plr.falling = true
plr.landed = false
plr.jumping = false
plr.springjumping = false
if (plr.dy > gravity) plr.landing = true

if plr.wallsliding and not plr.shelled then
--reset flip
if wall_dir == 0 then--wall on the left
plr.flp = true
                else
plr.flp = false
end
--wallstick, reduce or reset
if wall_stick > 0 then
stick_aligned(wall_dir)
end
if (btn(0) or btn(1)) and not btn(wall_dir)
                and not plr.walljumping then
wall_stick -= 1 --reduce
end
if btn(0) or btn(1) then--wallslide "friction"
plr.max_dy = wallslide_max_dy
                else
plr.max_dy = wallslide_max_dy * 3
end
            else
plr.max_dy = falling_max_dy
wall_stick = wall_stick_max--reset
end

--jumping grace
if plr.landing and was_landed and not plr.landed and grace_left > 0 then
grace_left -= 1
end

if collide_map(plr, "down", 0) then
plr_ground_collision()
end

--try pickup
collide_map(plr, "down", 4)
        elseif plr.dy < 0 then
if (not plr.walljumping and not plr.springjumping) plr.max_dy = default_max_dy
plr.jumping = true
if collide_map(plr, "up", 1)
            or lvl_boundary(plr.x, plr.y) then
plr.dy = 0
end
--try pickup, crate
collide_map(plr, "up", 4)
collide_map(plr, "up", 3)
end

--check collision left and right
if plr.dx != 0 then
            local dir = plr.dx < 0 and "left" or "right"
if collide_map(plr, dir, 1)
            or lvl_boundary(plr.x, plr.y)
or(dir == "left" and plr.x <= map_start) then
plr_x_collision()
end
--try pickup, crate
collide_map(plr, dir, 4)
collide_map(plr, dir, 3)
end

--limit speed only after fps_f * frames of springjump for a bigger initial boost
if (was_springjumping <= 0) limit_speed()
if (was_springjumping > 0) was_springjumping -= 1 / steps

--slide
if plr.landed
        and not(btn(0) or btn(1)) then
plr.running = false
plr.sliding = true
end
--stop sliding
if plr.sliding and not plr.shelled then
if abs(plr.dx) < (.6 / fps_f)
                and plr.landed
                or plr.running then
plr.running = false
plr.sliding = false
plr.dx = 0
end
end

--update plr position
plr.x += plr.dx / steps
plr.y += plr.dy / steps

--limit to map bounds
plr.x = max(plr.x, 0)
end

--water
    local hl_col = lvl == 3 and 6 or 11
    local body_col = lvl == 3 and 13 or 3
if (lvl == 2 or lvl == 3) and plr.x >= map_start + water_x_ofs * 8 and plr.y > 106 then
if not plr.submerged then
plr.submerged = true
spawn_splash(plr.x, plr.y + 3, 1.5, plr.dy * (.5 * fps_f) * -1, { body_col, hl_col, body_col, hl_col, body_col })
sfx(land_sfx, 2)
end
submersion_time = t()
    else
if plr.submerged then
--exit water
b_sfx(slide_sfx)
spawn_splash(plr.x, plr.y + 4, 1.5, plr.dy * (.5 * fps_f), { body_col, body_col, hl_col, body_col })
end
plr.submerged = false
end
pal(11, 11)

--check collision with pizza
    if (lvl == 4 and not game_won and collide_entity(plr, pizza)) win()
-- " switch
try_interact()
--lvl transition
lvl_transition()
end

function update_dx(dir)
--running dust particle fx
if plr.landed and #particles < 1
and((sin(t()) < .9 and rnd() < .9) or #particles == 0)
--if turning around
and((dir == -1 and not plr.flp) or(dir == 1 and plr.flp)
--or starting still
or(abs(plr.dx) < .5 and plr.running)) then
spawn_dust(plr.x, plr.y + 8, (not plr.flp), 2, { 6})
end
--update player dx
plr.dx += dir * plr.acc
plr.running = true
end

function limit_speed()
plr.dy = mid(-plr.max_dy, plr.dy, plr.max_dy)
plr.dx = mid(-plr.max_dx, plr.dx, plr.max_dx)
end

--returns direction as PICO - 8 button key: 0 = left, 1 = right, -1=no collision
function wallslide_direction()
--walljump hitbox is wider and around the feet
    local plr_hitbox = {
    x=plr.x - 1,
    y=plr.y + (plr.h / 2), --starts in the center of the sprite
h = (plr.h / 2) + 2, --stops a bit below the sprite
w = plr.w + 2
            }
if (collide_map(plr_hitbox, "left", 5)) return 0
if (collide_map(plr_hitbox, "right", 5)) return 1
return -1
end

function plr_jump(_boost)
_boost = _boost or default_boost
plr.dy -= _boost
plr.landed = false
plr.sliding = false
has_jumped = true
b_sfx(jump_sfx)
grace_left = 0
was_landed = false
jump_buffer = 0
end

--apply horizontal velocity towards the opposite direction from something(wall or spring)
--dir: (wall or spring) direction: 0 = left, 1 = right(PICO - 8 button keys)
function push_away(dir, _dx)
if (dir != 0) _dx *= -1
plr.dx = _dx
end

--walljump: update wallslide, apply player dx and dy
--different dx applied based on wall direction and player input
function plr_walljump()
plr.wallsliding = (wallslide_direction() != -1)
--only walljump if the following conditions are met
if walljump_delay < 1 and plr.wallsliding and not plr.shelled then
plr.max_dx = walljump_max_dx
walljump_delay = walljump_delay_max-- reset walljump delay
        local wall_dir = wallslide_direction()
if btn(wall_dir) then--if input against wall
push_away(wall_dir, walljump_max_dx)
        else --if input away or no x - input
if (not(btn(0) or btn(1))) plr.flp = not plr.flp
push_away(wall_dir, 1 / fps_f)
plr.dy = min(plr.dy, 0)-- stop dragging the jump down
end
plr.walljumping = true
wall_stick = wall_stick_max
plr.max_dy = walljump_max_dy
plr_jump(walljump_boost)
        local goo_x = plr.x + 4
if (wall_dir == 0) goo_x -= 8
spawn_goo(goo_x, plr.y + plr.h)--spawn extra goo
end
end

function behind_spring(dir)
return ((dir == "up" and plr.dy < 0) or(dir == "down" and plr.dy > 0))
end

--dir=the direction that the spring will make the player bounce to
function plr_springjump(dir)
--vertical springjump
plr.max_dy = springjump_max_dy
plr.springjumping = true
plr.landing = true
plr_ground_collision()
        local _boost = default_boost * (dir == "up" and 2 or - 2)
plr_jump(_boost)
end

--> 8
-------------------------------
    --interacting with items and transitions
-------------------------------

    --checking(horizontal) collisions with switches
function try_interact()
--smaller hitbox for more accurate switch press
    local    plr_hitbox = {
    x=plr.x + 2,
    y=plr.y,
    w=4,
    h=8
}
if plr.dx < 0 and collide_map(plr_hitbox, "left", 2)
    or plr.dx > 0 and collide_map(plr_hitbox, "right", 2) then
press_switch()
end
end

function press_switch()
pressed += 1
--conditions to fix random crash
if (type(switches) == "table" and pressed <= #switches) then
switches[pressed].sp = switches[pressed].first - 1
spawn_spark(plr.x + 6, plr.y + 4)
end
end

function lvl_transition()
    local end_distance = map_end - plr.x
if lvl == 0 and end_distance < 8 then
set_lvl_values(8, 104, 0, 256, 576)
init_lvl1_objects()
    elseif lvl == 1 and end_distance < 12 and pressed > 1 then
set_lvl_values(8, 106, 0, 128, 1024)
menuitem(2, "zone 2: sewers", load_lvl2)-- add option to reload from lvl2
music(16, 900)
    elseif lvl == 2 and end_distance < 40 and plr.y < 8 then
set_lvl_values(616, 112, 576, 256, 1024, 576)
menuitem(3, "zone 3: docks", load_lvl3)
music(31, 900, 2)
    elseif lvl == 3 and end_distance < 8 then
set_lvl_values(768, 104, 768, 0, 896, 768)
end
end

function win()
win_time = t() - menu_time
sfx(eat_sfx, 3)
spawn_crums(pizza.x + 2, pizza.y + 2)
game_won = true
pizza.sp += 1
sfx(win_sfx, 1)
pickups = {}
fadeout = t()
end

function remove_pickup(x, y)
for p in all(pickups) do
    if abs(p.y - y) < 1 and abs(p.x - x) < 1 then
sfx(pickup_sfx, 3)
spawn_dust(p.x * 8 + 1, p.y * 8 + 3 - cam_y, false, 8, { 3, 3, 3, 11})
collected += 1
del(pickups, p)
end
end
end

function hit_crate(_x, _y, _dir)
printh("hit")
if plr.shelled and abs(plr.dx) >= shelled_max_dx * .5 then
sfx(land_sfx, 2)
spawn_dust(_x * 8 + 3, plr.y + 2, false, 4, { 4, 5})
spawn_crums(_x * 8 + 3, _y * 8 + 2 - cam_y, { 4, 5})
add(crates_hit,
    {
        x=_x,
        y=_y,
        react_time=crate_time_max,
        dir=_dir
    })
mset(_x, _y, crate_hit_sp)
end
end

--> 8
-------------------------------
    --animation
-------------------------------

    --obj = table needs anim, sp
--call with first == empty to not loop
function next_frame(obj, first, last, speed)
obj.anim = t()
obj.sp = obj.sp + speed
if flr(obj.sp) > last then
obj.sp = first
end
end

function plr_animate()
    local dt = t() - plr.anim
if plr.shelled then
if plr.dy < 0 then
plr.sp = 15 -- shelled jump
            elseif plr.dy > 0 or plr.sp < 14 then
plr.sp = 14 -- default shelled
            elseif dt > .1 then-- shelled slide
plr.sp = 14
if abs(plr.dx) > shell_slide_min then
next_frame(slide_gfx, slide_gfx.first, slide_gfx.last, .4 / fps_f)
if (stat(23) < 0 or(ricochet.sp != ricochet.first and stat(19) == shelled_slide_sfx)) sfx(shelled_slide_sfx, 3)
end
end
        elseif plr.jumping then
if plr.dy > -1.5 then
plr.sp = 8
            else
plr.sp = 7
end
        elseif plr.wallsliding then
if plr.sp < 12 then
plr.sp = 12
end
if dt > .1 then
next_frame(plr, 12, 13, .4)
end
        elseif plr.falling then
if dt > .1 then
next_frame(plr, 9, 10, 1)
end
        elseif plr.sliding then
if plr.sp != 11 then
b_sfx(slide_sfx)
plr.sp = 11
end
        elseif plr.running and abs(plr.dx) > (1 / fps_f) then
if dt > .1 then
sfx(-1, 0)
next_frame(plr, 3, 6, 1)
end
        elseif dt > .5 then--idle
next_frame(plr, 1, 2, 1)
        elseif plr.sp > 2 then
--transition quickly to idle from landing
plr.sp = 1
end
end

--non - particle system dust fx
function update_dust()
if plr.dx > 0 then
dust_x = plr.x - 1
dust2_x = dust_x - 2
    else
dust_x = plr.x + 8
dust2_x = dust_x + 2
end
dust_y = plr.y + 6
dust2_y = dust_y - 1

if t() - dust_anim > .15 then
dust_anim = t()
dust_size -= 1
dust_x -= sin(dust_anim) - sgn(plr.dx)
dust_y -= sin(dust_anim) - 2
end

if dust_size < -2 then
dust_size = dust_max
end

--normalslide particlefx
if (not plr.falling and plr.sliding and not plr.shelled and((sin(t()) < .9 and rnd() < .9) or #particles == 0) and #particles < 2) spawn_dust(plr.x, plr.y + 8, (not plr.flp), 2, { 6})
end

--using 1 sprite, but sp, first, last, anim to offset it
function door_animate(obj)
mset(obj.x / 8, obj.y / 8, 0)
if obj.anim == 0 then
sfx(interact_sfx, 1)
b_sfx(door_sfx)
end
if obj.sp < obj.last then
if t() - obj.anim > .115 then
obj.anim = t()
obj.sp += 1
end
end
end

--> 8
-------------------------------
    --particles
-------------------------------
    --based on the lazy devs academy breakout tutorial

--add a particle
function add_particle(_x, _y, _dx, _dy, _type, _maxage, _col, _size)
 local _p = {}
_p.x = _x
_p.y = _y
_p.dx = _dx
_p.dy = _dy
_p.type = _type
_p.max_age = _maxage
_p.age = 0
_p.col = 0
_p.colors = _col
_p.size = _size
_p.old_size = _size

add(particles, _p)
end

--switch press fx
function spawn_spark(_x, _y)
    local dir = -1
if plr.flp then
_x -= 12
dir = 1
end
for i = 0, 12 do
        local _ang = rnd()
        local _dx = (sin(_ang) + rnd(3.5)) / fps_f
        local _dy = (cos(_ang) + rnd(3.5)) / fps_f
if (rnd() > .5) _dy *= -1
add_particle(_x, _y, dir * _dx, _dy, 2, (5 + rnd(5)) * fps_f, { 7}, 1 + rnd(1))
end
end

--jump / land / pickup particle fx
--offset right if _flp
--_n: number of particles, default based on plr.dy
--_n also affects particle size
--_col: colors table, defaults to grey(3 greys in lvl2)
function spawn_dust(_x, _y, _flp, _n, _col)
    local dir = 1
if _flp then
_x += plr.w
dir = -1
end
_n = _n or ceil(plr.dy * .5)
for i = 0, _n do
        local _ang = rnd()
        local _dx = (sin(_ang) + rnd()) / (fps_60 and 1.1 or 1)
        local _dy = (cos(_ang) + rnd()) / (fps_60 and 1.4 or 1)
if (_dy > 0) _dy *= -1
_col = _col or(lvl == 2 and { 13, 6, 5} or { 6})
        local _size = _n == 1 and 1 or 2
add_particle(_x, _y, dir * _dx, _dy, 2, (8 + rnd(5)) * fps_f, _col, _size + rnd(1))
end
end

--pizza eating fx
function spawn_crums(_x, _y, _col)
    local _n = 16
for i = 0, _n do
      local _ang = rnd()
        local _dx = (sin(_ang) + rnd()) / fps_f + plr.dx / 4
        local _dy = (cos(_ang) + rnd()) / fps_f - plr.dx / 4
if (not _col) _col = { 4, 9, 10, 9}
add_particle(_x, _y, _dx, _dy, 1, (5 + rnd(5)) * fps_f, _col, 0)
add_particle(_x, _y, _dx, _dy, 2, (10 + rnd(5)) * fps_f, _col, 1 + rnd(2))
end
end

--wallslide fx
function spawn_goo(_x, _y)
  local _ang = rnd()
  local _dx = (sin(_ang) + rnd())
if not plr.flp then
_dx *= -1
_x += plr.w
end
  local _dy = (cos(_ang) + rnd()) / fps_f
    local _col = { 11}
add_particle(_x, _y, _dx, _dy, 2, (3 + rnd(2)) * fps_f, _col, 1 + rnd(1))
end

--water splash fx
function spawn_splash(_x, _y, _dx, _dy, _col)
    local _col_first = { _col[1]}
    local _n = 40 + _dy * -10
for i = 0, _n do
        local _ang = rnd()
        local _dx = (sin(_ang) / (fps_60 and 1.2 or 1))* _dx + plr.dx / 2
        local _dy = (cos(_ang) / (fps_60 and 1.4 or 1))* _dy + rnd(1)
--smoke
add_particle(_x, _y, _dx, _dy, 2, (5 + rnd(10)) * fps_f, _col, 1 + rnd(2))
--gravity pixels
add_particle(_x, _y, _dx / 4, _dy / 4, 1, (15 + rnd(15)) * fps_f, _col_first, 0)
end
end

--particles
--type 0 - static pixel
--type 1 - gravity pixel
--type 2 - ball of smoke

--big particle updater
function update_particles()
    local _p
for i = #particles, 1, -1 do
    _p = particles[i]
        --particle decay
_p.age += 1
if _p.age > _p.max_age
        or _p.x < 8 or _p.x > map_end
        or _p.y < -20 or _p.y > 114 then
del(particles, particles[i])
        else
--change colors
if #_p.colors == 1 then
_p.col = _p.colors[1]
        else
--reference particle color array index
            local _ci = _p.age / _p.max_age
_ci = 1 + flr(_ci * #_p.colors)
_p.col = _p.colors[_ci]
end

--apply gravity
if _p.type == 1 then-- gravity pixel
_p.dy += 0.05 / fps_f
        elseif _p.type == 2 then-- smoke
--shrink
            local _ci = 1 - (_p.age / _p.max_age)
_p.size = _ci * _p.old_size
--friction
_p.dx = _p.dx / 1.2
_p.dy = _p.dy / 1.2
end

--move particle
_p.x += _p.dx
_p.y += _p.dy
end
end
end

--draw all particles
function draw_particles()
--sewer dust colors.currently affects HUD
if lvl == 2 then
pal(13, 13 + 128, 1)
pal(6, 6 + 128, 1)
pal(5, 5 + 128, 1)
end
for _p in all(particles) do
    if _p.type < 2 then
            pset(_p.x, _p.y, _p.col)
        else
circfill(_p.x, _p.y, _p.size, _p.col)
end
end
end

--> 8
-------------------------------
    --stars
-------------------------------
    --based on "simple game" by mboffin

function make_stars()
stars = {}
big_stars = {}
 local stars_per_screen = 36
for i = 0, stars_per_screen do
    for j = 0, map_end / 128 do
        local _x = j * 128 + rnd(128)
        local _y = cam_y + rnd(68)
make_star(_x, _y)
end
end
end

function make_star(x, y)
    local star_sprite = 112
     local s = {}
s.x = x or 0
s.y = y or 0
--get random color from sprite
s.c = sget(flr(rnd(4)), star_sprite / 2)
--set big or small
if (s.c > 5) then
        local too_close = false
for b in all(big_stars) do
    if (abs(b.x - s.x) < 6 or abs(b.y - s.y) < 6) too_close = true
end
if not too_close then
add(big_stars, s)
        else
add(stars, s)
end
    else
add(stars, s)
end
end

function draw_stars()
foreach(stars, draw_star)
foreach(big_stars, draw_big_star)
end

function update_star(s)
s.x += bg_cam_ofs
end

function draw_star(s)
--hide adjacent stars
circfill(s.x, s.y, 2, 0)
--star
pset(s.x, s.y, s.c)
end

function draw_big_star(s)
--hide nearby stars
circfill(s.x, s.y, 3, 0)
--flare
rect(s.x - 1, s.y - 1, s.x + 1, s.y + 1, 1)
line(s.x, s.y - 2, s.x, s.y + 2, 1)
line(s.x - 2, s.y, s.x + 2, s.y, 1)
circ(s.x, s.y, 1, 5)
--star
pset(s.x, s.y, s.c)
end