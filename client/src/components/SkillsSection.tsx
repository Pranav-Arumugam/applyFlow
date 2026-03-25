import { Job } from "../types"
type SkillVariant = "required" | "matched" | "missing" | "default"

interface SkillsSectionProps {
  job: Job
}

interface SkillPillProps {
  children: string
  variant?: SkillVariant
}

const SkillsSection = ({ job }: SkillsSectionProps) => {
  const required = job.requiredSkills || []
  const matched = job.matchedSkills || []
  const missing = job.missingSkills || []
  return (
    <div className='rounded-2xl bg-white p-4 shadow-sm border border-gray-100'>
      <h2 className='text-lg font-semibold mb-2'>Skills</h2>
      <div className='space-y-2'>
        <div className='space-y-2'>
          <p className='text-xs md:text-sm text-gray-500 font-semibold'>
            Required Skills
          </p>

          <div className='flex flex-wrap gap-2'>
            {required.length === 0 && (
              <p className='text-sm text-gray-400'>
                no required skills found ..
              </p>
            )}
            {required.map((skill) => (
              <SkillPill key={`req-${skill}`} variant='required'>
                {skill}
              </SkillPill>
            ))}
          </div>
        </div>
        <div className='space-y-2'>
          <p className='text-xs md:text-sm text-gray-500 font-semibold'>
            Matched Skills
          </p>
          <div className='flex flex-wrap gap-2'>
            {matched.length === 0 && (
              <p className='text-sm text-gray-400'>
                no matched skills found ..
              </p>
            )}
            {matched.map((skill) => (
              <SkillPill key={`mat-${skill}`} variant='matched'>
                {skill}
              </SkillPill>
            ))}
          </div>
        </div>
        <div className='space-y-2'>
          <p className='text-xs md:text-sm text-gray-500 font-semibold'>
            Missing Skills
          </p>
          <div className='flex flex-wrap gap-2'>
            {missing.length === 0 && (
              <p className='text-sm text-gray-400'>
                no missing skills found ..
              </p>
            )}
            {missing.map((skill) => (
              <SkillPill key={`miss-${skill}`} variant='missing'>
                {skill}
              </SkillPill>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SkillsSection

const SkillPill = ({ children, variant = "default" }: SkillPillProps) => {
  const styles =
    variant === "required"
      ? "bg-slate-100 text-slate-700"
      : variant === "matched"
        ? "bg-emerald-50 text-emerald-700"
        : variant === "missing"
          ? "bg-rose-50 text-rose-700"
          : "bg-gray-100 text-gray-700"

  return (
    <span
      className={`inline-flex item-center rounded-full px-3 py-2 text-xs font-medium ${styles} `}
    >
      {children}
    </span>
  )
}
