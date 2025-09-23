import React from "react";
import { UI_CONFIG, ACCESSIBILITY_CONFIG } from "./constants";
import SkillButtonSkeleton from "./SkillButtonSkeleton";

interface SkillFilterProps {
  availableSkills: string[];
  selectedSkills: string[];
  onSkillChange: (skill: string) => void;
  loading: boolean;
}

const SkillFilter: React.FC<SkillFilterProps> = ({
  availableSkills,
  selectedSkills,
  onSkillChange,
  loading,
}) => {
  const renderButtons = (): JSX.Element[] => {
    const buttonColors = UI_CONFIG.SKILL_BUTTON_COLORS;

    return availableSkills.map((skill, index) => {
      const color = buttonColors[index % buttonColors.length];
      const isSelected = selectedSkills.includes(skill);

      return (
        <label
          key={index}
          className={`border border-[${color}] text-[${color}] py-2 px-4 m-2 rounded flex items-center justify-center text-[16px] cursor-pointer capitalize ${
            isSelected ? "bg-gray-200" : ""
          } cyberpunk-checkbox-label`}
          aria-label={`Filter by ${skill} skill`}
        >
          <input
            type="checkbox"
            name="skill"
            value={skill}
            checked={isSelected}
            onChange={() => onSkillChange(skill)}
            className="cursor-pointer mr-2"
            style={{ accentColor: color }}
            aria-describedby={`skill-${index}-description`}
          />
          <span id={`skill-${index}-description`}>{skill}</span>
        </label>
      );
    });
  };

  return (
    <div
      className="flex w-full px-[5px] md:px-[50px] btnContainer"
      role="group"
      aria-label={ACCESSIBILITY_CONFIG.ARIA_LABELS.SKILL_FILTERS}
    >
      {loading ? <SkillButtonSkeleton /> : renderButtons()}
    </div>
  );
};

export default SkillFilter;
