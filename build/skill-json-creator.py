# -*- coding: utf-8 -*-

import sys

LEVEL = 1
ENTRY = "{{\"name\": \"{}\", \"type\": \"{}\", \"level\": {}, \"skillMembers\": [{}]}},"
MEMBER_ENTRY = "\"{}\", \"{}\", \"{}\", \"{}\""

if __name__ == "__main__":
    
    if (len(sys.argv) > 1):
        _type = sys.argv[1]
    else:
        _type = "Compound"

    print("Welcome to the Skill Creator [Type {}].\n\n".format(_type))

    created_skills = []

    skill_name = input("Skill name: ")

    file_name = "skills-{}.txt".format(_type.lower())

    f = open(file_name, "a")

    while skill_name.upper() != "Q":

        if _type == "Compound":
            skill_a = input("Skill 1: ")
            skill_b = input("Skill 2: ")
            skill_c = input("Skill 3: ")
            skill_d = input("Skill 4: ")
            members = MEMBER_ENTRY.format(skill_a, skill_b, skill_c, skill_d)
        else:
            members = ""

        entry = ENTRY.format(skill_name, _type, LEVEL, members)

        created_skills.append(entry)
        f.write(entry)
        f.write("\n")

        skill_name = input("\nSkill name: ")

    f.close()

    #for it in created_skills:
    #    print(it)