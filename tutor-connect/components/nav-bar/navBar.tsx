//TODO: Change Nav bar to use shadcn
//Error is likely due to next-auth
//TODO: Add Avatar to the profile
import Logo from "./logo";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// TODO: For future reference, to update the list of pages to traverse to
// TODO: Highlight current page

const items = [
  {
    key: "new",
    label: "New file",
  },
  {
    key: "copy",
    label: "Copy link",
  },
  {
    key: "edit",
    label: "Edit file",
  },
  {
    key: "delete",
    label: "Delete file",
  },
];

export default function NavBar() {
  return (
    <div className="bg-gray-100 text-gray-800 min-h-screen">
      <header className="bg-white text-blue-600 py-4 flex items-center justify-between px-8">
        <div className="flex items-center">
          <div className="w-32">
            <Logo />
          </div>
          <div className="ml-4">
            <h1 className="text-xl mb-1">
              Welcome to TutorConnect!
            </h1>
            <p className="text-sm">
              The number one platform for tutors and tutees to connect!
            </p>
          </div>
        </div>
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger>Menu</DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Billing</DropdownMenuItem>
              <DropdownMenuItem>Team</DropdownMenuItem>
              <DropdownMenuItem>Subscription</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
      {/* <main className="bg-white max-w-4xl mx-auto my-8 p-8 shadow-md">
        Additional content can be placed here if needed
      </main> */}
      {/* TODO Add a dropdown widget here */}
    </div>
  );
}
