'use client'

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { signIn } from "next-auth/react"
import { useState } from 'react'
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
  } from "@/components/ui/tabs"
  import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"  
import { Select, SelectItem, SelectContent, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdownmenu"
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu"

type Checked = DropdownMenuCheckboxItemProps["checked"]

export const RegisterForm = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [contactNumber, setContactNumber] = useState('')
    const [dateOfBirth, setDateOfBirth] = useState('')
    const [age, setAge] = useState('')
    const [nationality, setNationality] = useState('')
    const [gender, setGender] = useState('')
    const [race, setRace] = useState('')
    const [yearsOfExperience, setYearsOfExperience] = useState('')
    const [typeOfTutor, setTypeofTutor] = useState('')
    const [highestEducationLevel, setHighestEducationLevel] = useState('')
    const [error, setError] = useState<string | null>(null)


    const [showStatusBar, setShowStatusBar] = React.useState<Checked>(true)
    const [showActivityBar, setShowActivityBar] = React.useState<Checked>(false)
    const [showPanel, setShowPanel] = React.useState<Checked>(false)


    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        
        try {
            const res = await fetch('/api/register-as-a-tutor', {
                method: 'POST',
                body: JSON.stringify({
                    email, password, name, contactNumber, dateOfBirth, gender, age, nationality, race
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            
            if (res.ok) {
                signIn()
            } else {
                setError((await res.json()).error)
            }
        } catch (error: any) {
            setError(error?.message)
        }

        console.log("Register!")
    }

    return (
        /*
        <form onSubmit={onSubmit} className="space-y-12 w-full sm:w-[400px]">
        </form>
        */
        <Tabs defaultValue="personalInformation" className="w-full">
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
                <Label htmlFor="dateOfBirth">Date Of Birth</Label>
                <Input 
                  required
                  value={dateOfBirth}
                  onChange={(e) => setDateOfBirth(e.target.value)}
                  id="dateOfBirth" 
                  type="dateOfBirth" 
                />
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
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
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
                    <SelectItem value="singaporean">Singaporean</SelectItem>
                    <SelectItem value="singaporePR">Singapore PR</SelectItem>
                    <SelectItem value="others">Others</SelectItem>
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
              <Button>Save changes</Button>
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
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">Open</Button>
                </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Appearance</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem
          checked={showStatusBar}
          onCheckedChange={setShowStatusBar}
        >
          Status Bar
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={showActivityBar}
          onCheckedChange={setShowActivityBar}
          disabled
        >
          Activity Bar
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={showPanel}
          onCheckedChange={setShowPanel}
        >
          Panel
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save password</Button>
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
                    <SelectItem value="poly/alevel">Poly / A Level student</SelectItem>
                    <SelectItem value="undergraduate">Undergraduate</SelectItem>
                    <SelectItem value="part-time">Part-Time Tutor</SelectItem>
                    <SelectItem value="full-time">Full-Time Tutor</SelectItem>
                    <SelectItem value="nietrainee">NIE Trainee</SelectItem>
                    <SelectItem value="ex-MOE">Ex-MOE Teacher</SelectItem>
                    <SelectItem value="currentMOE">Current MOE Teacher</SelectItem>
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
                    <SelectItem value="diploma">Poly Diploma</SelectItem>
                    <SelectItem value="a levels">A Levels</SelectItem>
                    <SelectItem value="undergraduate">Undergraduate</SelectItem>
                    <SelectItem value="bachelor degree">Bachelor Degree</SelectItem>
                    <SelectItem value="post-graduate diploma">Post-Graduate Diploma</SelectItem>
                    <SelectItem value="masters degree">Masters Degree</SelectItem>
                    <SelectItem value="PHD">PHD</SelectItem>
                    <SelectItem value="others">Others</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save password</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    )
}