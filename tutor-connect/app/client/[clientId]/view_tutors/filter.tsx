import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	MultiSelector,
	MultiSelectorContent,
	MultiSelectorInput,
	MultiSelectorItem,
	MultiSelectorList,
	MultiSelectorTrigger,
} from "@/components/ui/multiselect";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { levels, subjectsByLevel } from "@/utils/levelsAndSubjects";
import { B } from "@vercel/blob/dist/helpers-BfcvAwfQ.cjs";
import React from "react";

const FilterSection = () => {
	const [gender, setGender] = React.useState("");
	const [race, setRace] = React.useState("");
	const [selectedLevel, setSelectedLevel] = React.useState<string | null>(null);
	const [selectedSubject, setSelectedSubject] = React.useState<string[]>([]);
	const [tutorType, setTutorType] = React.useState("");
	const [yearsOfExperience, setYearsOfExperience] = React.useState("");

    const clearFilters = () => {
        setGender("");
        setRace("");
        setSelectedLevel(null);
        setSelectedSubject([]);
        setTutorType("");
        setYearsOfExperience("");
    }

	const styles = {
		filterSection: {
			border: "1px solid lightgray",
			borderRadius: "10px",
			padding: "20px",
			marginBottom: "20px",
			width: "700px",
		},

		button: {
			backgroundColor: "#5790AB",
			color: "#fff",
			font: "Poppins",
			fontWeight: "bold",
			fontSize: "16px",
			width: "100%",
		},

		filterButton: {
			backgroundColor: "#fff",
			color: "#5790AB",
			font: "Poppins",
			fontWeight: "bold",
			fontSize: "16px",
			width: "100%",
			border: "1px solid #5790AB",
		},
	};

	return (
		<div style={styles.filterSection}>
			<div className="grid grid-cols-2 gap-4" style={{ padding: "7px" }}>
				<div className="col-span-1 space-y-1">
					<Label htmlFor="age" style={{ fontWeight: "bold" }}>
						Gender
					</Label>
					<Select
						required
						value={gender}
						onValueChange={(value: string) => setGender(value)}
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
				<div className="col-span-1 space-y-1">
					<Label htmlFor="gender" style={{ fontWeight: "bold" }}>
						Race
					</Label>
					<Select
						required
						value={race}
						onValueChange={(value: string) => setRace(value)}
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
			<div className="grid grid-cols-2 gap-4" style={{ padding: "7px" }}>
				<div className="col-span-1 space-y-1">
					<Label htmlFor="level" style={{ fontWeight: "bold" }}>
						Level
					</Label>
					<Select
						value={selectedLevel || ""}
						onValueChange={(value: string) =>
							setSelectedLevel(value)
						}
					>
						<SelectTrigger className="w-full">
							<SelectValue placeholder="Select a Level" />
						</SelectTrigger>
						<SelectContent>
							{Object.entries(levels).map(
								([category, levels]) => (
									<SelectGroup key={category}>
										<SelectLabel>{category}</SelectLabel>
										{levels.map((level: string) => (
											<SelectItem
												key={level}
												value={level}
											>
												{level}
											</SelectItem>
										))}
									</SelectGroup>
								)
							)}
						</SelectContent>
					</Select>
				</div>
				<div className="col-span-1 space-y-1">
					<Label htmlFor="subject" style={{ fontWeight: "bold" }}>
						Subject
					</Label>
					<MultiSelector
						values={selectedSubject}
						onValuesChange={setSelectedSubject}
						loop={false}
						disabled={
							!selectedLevel ||
							selectedLevel === "Poly" ||
							selectedLevel === "University"
						}
						className="space-y-0"
					>
						<MultiSelectorTrigger className="w-full">
							<MultiSelectorInput
								placeholder={"Select a Subject"}
								style={{ fontSize: "15px" }}
							/>
						</MultiSelectorTrigger>
						<MultiSelectorContent>
							<MultiSelectorList>
								{selectedLevel &&
									subjectsByLevel[selectedLevel].map(
										(subject: string) => (
											<MultiSelectorItem
												key={subject}
												value={subject}
											>
												{subject}
											</MultiSelectorItem>
										)
									)}
							</MultiSelectorList>
						</MultiSelectorContent>
					</MultiSelector>
				</div>
			</div>
			<div className="grid grid-cols-2 gap-4" style={{ padding: "7px" }}>
				<div className="col-span-1 space-y-1">
					<Label htmlFor="typeOfTutor" style={{ fontWeight: "bold" }}>
						Type of Tutor
					</Label>
					<Select
						required
						value={tutorType}
						onValueChange={(value: string) => setTutorType(value)}
					>
						<div>
							<SelectTrigger className="w-full">
								<SelectValue placeholder="Select a type" />
							</SelectTrigger>
						</div>
						<SelectContent>
							<SelectItem value="Part-Time">
								Part-Time Tutor
							</SelectItem>
							<SelectItem value="Full-Time">
								Full-Time Tutor
							</SelectItem>
							<SelectItem value="Ex/Current MOE Teacher">
								Ex/Current MOE Teacher
							</SelectItem>
						</SelectContent>
					</Select>
				</div>
				<div className="col-span-1 space-y-1">
					<Label
						htmlFor="yearsOfExperience"
						style={{ fontWeight: "bold" }}
					>
						Years of Experience
					</Label>
					<Input
						required
						value={yearsOfExperience}
						onChange={(e) => setYearsOfExperience(e.target.value)}
						id="yearsOfExperience"
						type="yearsOfExperience"
						placeholder="Please input a number"
					/>
				</div>
			</div>
			<div className="grid grid-cols-2 gap-4" style={{ padding: "7px" }}>
				<div className="col-span-1 space-y-1">
					<Button style={styles.button}>Search</Button>
				</div>
				<div className="col-span-1 space-y-1">
					<Button style={styles.filterButton} onClick={clearFilters}>Clear Filters</Button>
				</div>
			</div>
		</div>
	);
};

export default FilterSection;
