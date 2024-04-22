import { useFeedbackItemsStore } from "../../store/feedbackitemStore";
import FeedbackForm from "../feedback/FeedbackForm";
import Logo from "../Logo";
import PageHeading from "../PageHeading";
import Pattern from "../Pattern";

export default function Header() {
  const handleAddItems = useFeedbackItemsStore(state => state.addItemToList)
  return (
    <header>
      <Pattern />
      <Logo />
      <PageHeading />
      <FeedbackForm handleAddItems={handleAddItems} />
    </header>
  )
}
