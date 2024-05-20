'use client'

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"  
import { Select, SelectItem, SelectContent, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import { useRouter } from "next/navigation"

export const RegisterForm = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [contactNumber, setContactNumber] = useState('')
    const [dateOfBirth, setDateOfBirth] = useState<Date>()
    const [age, setAge] = useState('')
    const [nationality, setNationality] = useState('')
    const [gender, setGender] = useState('')
    const [race, setRace] = useState('')
    const [yearsOfExperience, setYearsOfExperience] = useState('')
    const [typeOfTutor, setTypeofTutor] = useState('')
    const [highestEducationLevel, setHighestEducationLevel] = useState('')
    const [error, setError] = useState<string | null>(null)
    const [currentTab, setCurrentTab] = useState('personalInformation')

    const router = useRouter()

    const onBack = () => {
      const tabs = ['personalInformation', 'tutorPreferences', 'academicQualifications']
      const currentIndex = tabs.indexOf(currentTab)
      if (currentIndex > 0) {
          setCurrentTab(tabs[currentIndex - 1])
      }
    }

    const onNext = () => {
      const tabs = ['personalInformation', 'tutorPreferences', 'academicQualifications']
      const currentIndex = tabs.indexOf(currentTab)
      if (currentIndex < tabs.length - 1) {
          setCurrentTab(tabs[currentIndex + 1])
      }
    }

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        
        try {
            const res = await fetch('/api/register-as-a-tutor', {
                method: 'POST',
                body: JSON.stringify({
                    email, password, name, contactNumber, dateOfBirth, gender, age, nationality, race, yearsOfExperience, typeOfTutor, highestEducationLevel
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            
            if (res.ok) {
                router.push("http://localhost:3000/tutor-log-in")
            } else {
                setError((await res.json()).error)
            }
        } catch (error: any) {
            setError(error?.message)
        }

        console.log("Register!")
    }

    return (
      <form onSubmit={onSubmit}>
        <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="personalInformation">Personal Information</TabsTrigger>
          <TabsTrigger value="tutorPreferences">Tutor Preferences</TabsTrigger>
          <TabsTrigger value="academicQualifications">Academic Qualifications</TabsTrigger>
        </TabsList>
        <TabsContent value="personalInformation">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>
                Fill up your personal information. Click next when you're done.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="name">Name</Label>
                <Input 
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    id="name" 
                    type="name" 
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    id="email" 
                    type="email" 
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="password">Password</Label>
                <Input 
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    id="password" 
                    type="password" 
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-1 space-y-1">
                <Label htmlFor="contactNumber">Contact Number</Label>
                <Input 
                  required
                  value={contactNumber}
                  onChange={(e) => setContactNumber(e.target.value)}
                  id="contactNumber" 
                  type="contactNumber" 
                />
                </div>
                <div className="col-span-1 space-y-1">
                <Label htmlFor="dateOfBirth">Date Of Birth (MM-DD-YYYY)</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <div>
                        <Button
                          variant={"outline"}
                          onClick={(e) => {}}
                          className={cn("w-[240px] justify-start text-left font-normal", !dateOfBirth && "text-muted-foreground")}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {dateOfBirth ? dateOfBirth.toLocaleDateString() : <span>Pick a date</span>}
                        </Button>
                      </div>
                    </PopoverTrigger>
                    <PopoverContent align="start" className=" w-auto p-0">
                      <Calendar
                        mode="single"
                        captionLayout="dropdown-buttons"
                        selected={dateOfBirth}
                        onSelect={setDateOfBirth}
                        fromYear={1960}
                        toYear={2030}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-1 space-y-1">
                <Label htmlFor="age">Age</Label>
                <Input 
                  required
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  id="age" 
                  type="age" 
                />
                </div>
                <div className="col-span-1 space-y-1">
                <Label htmlFor="gender">Gender</Label>
                <Select 
                  required
                  value={gender}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setGender(e.target.value)}
                  onValueChange={setGender}
                  id="gender"
                  type="gender" 
                >
                  <div>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a gender" />
                  </SelectTrigger>
                  </div>
                  <SelectContent>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                  </SelectContent>
                </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-1 space-y-1">
                <Label htmlFor="nationality">Nationality</Label>
                <Select 
                  required
                  value={nationality}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setNationality(e.target.value)}
                  onValueChange={setNationality}
                  id="nationality"
                  type="nationality" 
                >
                  <div>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a nationality" />
                  </SelectTrigger>
                  </div>
                  <SelectContent>
                    <SelectItem value="Singaporean">Singaporean</SelectItem>
                    <SelectItem value="Singapore PR">Singapore PR</SelectItem>
                    <SelectItem value="Others">Others</SelectItem>
                  </SelectContent>
                </Select>
                </div>
                <div className="col-span-1 space-y-1">
                <Label htmlFor="race">Race</Label>
                <Select 
                  required
                  value={race}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setRace(e.target.value)}
                  onValueChange={setRace}
                  id="race" 
                  type="race" 
                >
                  <div>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a race" />
                  </SelectTrigger>
                  </div>
                  <SelectContent>
                    <SelectItem value="Chinese">Chinese</SelectItem>
                    <SelectItem value="Malay">Malay</SelectItem>
                    <SelectItem value="Indian">Indian</SelectItem>
                    <SelectItem value="Others">Others</SelectItem>
                  </SelectContent>
                </Select>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={onNext} className="w-full">Next</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="tutorPreferences">
          <Card>
            <CardHeader>
              <CardTitle>Tutor Preferences</CardTitle> 
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
              
              </div>
            </CardContent>
            <CardFooter className="flex justify-between space-x-2">
              <Button onClick={onBack} className="flex-1">Back</Button>
              <Button onClick={onNext} className="flex-1">Next</Button>
            </CardFooter>
          </Card>
        </TabsContent>


        <TabsContent value="academicQualifications">
          <Card>
            <CardHeader>
              <CardTitle>Academic Qualifications</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="yearsOfExperience">Years of Teaching Experience</Label>
                <Input 
                  required
                  value={yearsOfExperience}
                  onChange={(e) => setYearsOfExperience(e.target.value)}
                  id="yearsOfExperience" 
                  type="yearsOfExperience" 
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="typeOfTutor">Type of Tutor</Label>
                <Select 
                  required
                  value={typeOfTutor}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setTypeofTutor(e.target.value)}
                  onValueChange={setTypeofTutor}
                  id="typeOfTutor" 
                  type="typeOfTutor" 
                >
                  <div>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a type" />
                  </SelectTrigger>
                  </div>
                  <SelectContent>
                    <SelectItem value="Poly/A level">Poly / A Level student</SelectItem>
                    <SelectItem value="Undergraduate">Undergraduate</SelectItem>
                    <SelectItem value="Part-Time">Part-Time Tutor</SelectItem>
                    <SelectItem value="Full-Time">Full-Time Tutor</SelectItem>
                    <SelectItem value="NIE Trainee">NIE Trainee</SelectItem>
                    <SelectItem value="Ex-MOE">Ex-MOE Teacher</SelectItem>
                    <SelectItem value="Current MOE">Current MOE Teacher</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1">
                <Label htmlFor="highestEducationLevel">Highest Education Level</Label>
                <Select 
                  required
                  value={highestEducationLevel}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setHighestEducationLevel(e.target.value)}
                  onValueChange={setHighestEducationLevel}
                  id="highestEducationLevel" 
                  type="highestEducationLevel" 
                >
                  <div>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select an education level" />
                  </SelectTrigger>
                  </div>
                  <SelectContent>
                    <SelectItem value="Diploma">Poly Diploma</SelectItem>
                    <SelectItem value="A levels">A Levels</SelectItem>
                    <SelectItem value="Undergraduate">Undergraduate</SelectItem>
                    <SelectItem value="Bachelor Degree">Bachelor Degree</SelectItem>
                    <SelectItem value="Post-Graduate Diploma">Post-Graduate Diploma</SelectItem>
                    <SelectItem value="Masters Degree">Masters Degree</SelectItem>
                    <SelectItem value="PHD">PHD</SelectItem>
                    <SelectItem value="Others">Others</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between space-x-2">
              <Button onClick={onBack} className="flex-1">Back</Button>
              <Button className="flex-1">Register</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </form>
    )
}