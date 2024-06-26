// levelsAndSubjects.ts
export const levels: { [key: string]: string[] } = {
  Primary: ["Primary 1", "Primary 2", "Primary 3", "Primary 4", "Primary 5", "Primary 6"],
  "Lower Secondary": ["Sec 1 Express", "Sec 1 NA", "Sec 1 NT", "Sec 1 IP", "Sec 2 Express", "Sec 2 NA", "Sec 2 NT", "Sec 2 IP"],
  "Upper Secondary": ["Sec 3 Express", "Sec 3 NA", "Sec 3 NT", "Sec 3 IP", "Sec 4 Express", "Sec 4 NA", "Sec 4 NT", "Sec 4 IP", "Sec 5 NA", "Sec 5 NT"],
  "Junior College": ["JC1", "JC2"],
  "Pre-School": ["Nursery 1", "Nursery 2", "Kindergarten 1", "Kindergarten 2"],
  IGCSE: ["IGCSE Year 1", "IGCSE Year 2", "IGCSE Year 3", "IGCSE Year 4", "IGCSE Year 5", "IGCSE Year 6", "IGCSE Year 7", "IGCSE Year 8", "IGCSE Year 9", "IGCSE Year 10"],
  "IB/Diploma": ["IB Year 1", "IB Year 2"],
  "Poly/University": ["Poly", "University"],
  Others: ["Others"],
};

export const subjectsByLevel: Record<string, string[]> = {
  "Primary 1": ["English", "Math", "Science", "Chinese", "Higher Chinese", "Malay", "Higher Malay", "Tamil", "Higher Tamil", "Hindi"],
  "Primary 2": ["English", "Math", "Science", "Chinese", "Higher Chinese", "Malay", "Higher Malay", "Tamil", "Higher Tamil", "Hindi"],
  "Primary 3": ["English", "Math", "Science", "Chinese", "Higher Chinese", "Malay", "Higher Malay", "Tamil", "Higher Tamil", "Hindi"],
  "Primary 4": ["English", "Math", "Science", "Chinese", "Higher Chinese", "Malay", "Higher Malay", "Tamil", "Higher Tamil", "Hindi"],
  "Primary 5": ["English", "Math", "Science", "Chinese", "Higher Chinese", "Malay", "Higher Malay", "Tamil", "Higher Tamil", "Hindi"],
  "Primary 6": ["English", "Math", "Science", "Chinese", "Higher Chinese", "Malay", "Higher Malay", "Tamil", "Higher Tamil", "Hindi"],
  // Add remaining levels and subjects similarly...
};
