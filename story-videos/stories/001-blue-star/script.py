# Story: THE BLUE STAR  (Part 1)
NARR="am_michael"; DEX="am_puck"; VERA="af_nicole"; THIEF="bm_lewis"
LINES=[
 # id, voice, speed, text, scene
 ("l01",NARR,1.08,"You're a night janitor. Tonight, you're robbing the most secure museum in the city.","s1"),
 ("l02",NARR,1.08,"The target: the Blue Star diamond. Forty million dollars. Your cut? Four million.","s2"),
 ("l03",NARR,1.08,"Your crew waits outside. Dex controls the cameras. Vera drives. You have six minutes.","s3"),
 ("l03b",VERA,1.05,"Engine's running. Don't be late.","s3"),
 ("l04",NARR,1.08,"Keycard. Beep. Green light. The door opens. Too easy.","s4"),
 ("l05",NARR,1.08,"Then your earpiece crackles.","s5"),
 ("l06",DEX,1.05,"Don't touch the glass. The sensors just changed.","s5"),
 ("l07",NARR,1.08,"The diamond sits behind a laser grid. One wrong move, and the whole building wakes up.","s6"),
 ("l08",NARR,1.08,"You crawl under the first beam. Then the second. Your heart is pounding. Then you freeze.","s7"),
 ("l09",NARR,1.08,"Someone is already at the dome. Black mask. Diamond in his hand.","s8"),
 ("l10",THIEF,1.0,"Relax, rookie. Your crew sold you out. Same as mine.","s9"),
 ("l11",NARR,1.1,"Alarms scream. Thirty seconds until the guards arrive.","s10"),
 ("l12",DEX,1.1,"Run! It's a trap!","s10"),
 ("l13",VERA,1.08,"Grab the diamond! I'm leaving in thirty!","s10"),
 ("l14",NARR,1.08,"Fight him for forty million? Or run for the exit, empty handed?","s11"),
 ("l15",NARR,1.08,"Comment A or B. Part two drops tomorrow.","s11"),
]

# gap (seconds of silence) AFTER each line; lines not listed use 0.5
GAPS={'l01':.6,'l02':.55,'l03':.35,'l03b':.65,'l04':1.0,'l05':.25,'l06':.7,'l07':.6,'l08':1.0,'l09':.55,'l10':.6,'l11':.12,'l12':.1,'l13':.5,'l14':.45,'l15':0}
LEAD=0.8      # silence before first line (title card plays)
END_HOLD=3.6  # hold after last line
