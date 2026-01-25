import React, { useEffect, useState } from "react"
import { useCurrentUser, useUpdateuser } from "../hooks/useAuth"
import { toast } from "react-toastify"
import { X, Plus } from "lucide-react"
const Profile = () => {
  const { data: user, isLoading, error: getError } = useCurrentUser()
  const { mutate: updateUser, isPending, error: updateError } = useUpdateuser()
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    name: "",
    lastName: "",
    email: "",
    location: "",
    skills: [],
  })
  const LOCATION_OPTION = [
    "London, Uk",
    "Liverpool UK",
    "Manchester, UK",
    "Edinburgh, UK",
    "Ireland",
  ]
  const [newSkill, setNewSkill] = useState("")

  useEffect(() => {
    if (user) {
      setProfileData({
        name: user.name || "",
        lastName: user.lastName || "",
        email: user.email || "",
        location: user.location || "",
        skills: user.skills || [],
      })
    }
  }, [user])

  const handleChange = (e) => {
    const { name, value } = e.target
    setProfileData((prev) => ({ ...prev, [name]: value }))
  }

  const addSkill = () => {
    const trimmed = newSkill.trim()
    if (!trimmed) return

    setProfileData((prev) => {
      const exists = prev.skills.some(
        (s) => s.name.toLowerCase() === trimmed.toLowerCase(),
      )
      if (exists) return prev

      return {
        ...prev,
        skills: [
          ...prev.skills,
          { name: trimmed.toLowerCase(), level: "intermediate" },
        ],
      }
    })
    setNewSkill("")
  }

  const removeSkill = (skillName) => {
    setProfileData((prev) => ({
      ...prev,
      skills: prev.skills.filter(
        (s) => s.name.toLowerCase() !== skillName.toLowerCase(),
      ),
    }))
  }

  const handleSave = () => {
    // Here you would make an API call to save the data
    console.log("Saving profile:", profileData)
    updateUser(profileData, {
      onSuccess: () => {
        toast.success("Profile Saved Successfully")
        setIsEditing(false)
      },
    })
    setIsEditing(false)
  }

  return (
    <div className='min-h-screen bg-lineaer-to-br from-purple-50 to-blue-50 p-4'>
      <div className='w-full max-w-400 rounded-2xl bg-white p-4 shadow-lg border border-gray-100'>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
          <div className='lg:col-span-1 bg-white rounded-2xl shadow-sm p-8 space-y-8'>
            <div>
              <h2 className='text-xl font-semibold mb-6'>
                Profile Information
              </h2>
              <div className='flex flex-col items-center justify-center gap-2 '>
                <div className='w-24 h-24 rounded-full bg-linear-to-br from blue-200 to-purple-200 flex items-center justify-center'>
                  <span className='text-4xl font-bold text-indigo-600'>
                    {profileData.name?.[0]?.toUpperCase() || "U"}
                  </span>
                </div>
                <p>{profileData.email}</p>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className='mt-6 px-4 py-2 text-sm font-medium text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors flex items-center gap-2'
                >
                  <span>✏️</span>
                  <span>{isEditing ? "Cancel" : "Edit"}</span>
                </button>
              </div>
            </div>
          </div>
          <div className='space-y-6'>
            <div className='grid grid-cols-2 gap-3'>
              <Field label={"First Name"}>
                {isEditing ? (
                  <input
                    type='text'
                    className='input'
                    value={profileData.name}
                    onChange={handleChange}
                  />
                ) : (
                  <p className='text-gray-900 px-4 py-2.5 border border-gray-100 rounded-2xl'>
                    {profileData.name}
                  </p>
                )}
              </Field>
              <Field label={"Last Name"}>
                {isEditing ? (
                  <input
                    type='text'
                    value={profileData.lastName}
                    onChange={handleChange}
                    className='input'
                  />
                ) : (
                  <p className='text-gray-900 px-4 py-2.5  border border-gray-100 rounded-2xl'>
                    {profileData.lastName}
                  </p>
                )}
              </Field>
            </div>
            <Field label={"Email Address"}>
              {isEditing ? (
                <input
                  type='text'
                  value={profileData.email}
                  onChange={handleChange}
                  className='input'
                />
              ) : (
                <p className='text-gray-900 px-4 py-2.5  border border-gray-100 rounded-2xl'>
                  {profileData.email}
                </p>
              )}
            </Field>
            <Field label={"Location"}>
              {isEditing ? (
                <select
                  name='location'
                  value={profileData.location}
                  onChange={handleChange}
                  className='input'
                >
                  <option value=''>Select your location</option>
                  {LOCATION_OPTION.map((location) => (
                    <option value={location}>{location}</option>
                  ))}
                </select>
              ) : (
                <p className='text-gray-900 px-4 py-2.5  border border-gray-100 rounded-2xl'>
                  {profileData.location}
                </p>
              )}
            </Field>

            <div>
              <h2 className='text-xl font-semibold mb-4'>
                {isEditing ? "Edit SkillSet" : "Skillset"}
              </h2>
              <div className='flex flex-wrap gap-2 mb-4'>
                {profileData.skills.length === 0 && (
                  <span className='text-sm text-gray-400'>
                    No skills added yet .
                  </span>
                )}
                {profileData.skills.map((skill) => (
                  <span
                    key={skill.name}
                    className='inline-flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-lg text-sm font-medium'
                  >
                    <span className='capitalize'>{skill.name}</span>
                    {isEditing && (
                      <button
                        onClick={() => removeSkill(skill.name)}
                        className='hover:bg-purple-200 rounded-full p-0.5 transition-colors'
                      >
                        <X className='w-3.5 h-3.5' />
                      </button>
                    )}
                  </span>
                ))}
                {isEditing && (
                  <button
                    onClick={() => {
                      const input = document.getElementById("skillInput")
                      if (input) input.focus()
                    }}
                    className='inline-flex items-center gap-1 px-4 py-2 border-2 border-dashed border-gray-300 text-gray-600 rounded-lg text-sm font-medium hover:border-indigo-400 hover:text-indigo-600 transition-colors'
                  >
                    <Plus className='w-4 h-4' />
                  </button>
                )}

                {isEditing && (
                  <div className='flex gap-2'>
                    <input
                      type='text'
                      id='skillInput'
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault()
                          addSkill()
                        }
                      }}
                      placeholder='Add a skill...'
                      className='flex-1 px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm'
                    />
                    <button
                      onClick={addSkill}
                      className='px-4 py-2.5 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors'
                    >
                      Add
                    </button>
                  </div>
                )}
              </div>
              {isEditing && (
                <button
                  onClick={handleSave}
                  disabled={isPending}
                  className='mt-4 text-sm text-white bg-blue-600 p-3 rounded-3xl font-medium hover:text-indigo-700 flex items-center gap-2 disabled:opacity-50'
                >
                  {isPending ? "Saving..." : "Save Profile"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const Field = ({ label, children }) => (
  <label className='flex flex-col gap-3 text-sm '>
    <span className='font-semibold text-gray-700'>{label}</span>
    {children}
  </label>
)

export default Profile
