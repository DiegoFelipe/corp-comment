import { useFeedbackItemsStore } from "../../store/feedbackitemStore";
import HashtagItem from "./HashtagItem"

// type HashtagListProps = { companyList: string[]; handleSelectedCompany: (company: string) => void }

export default function HashtagList() {
  const companyList = useFeedbackItemsStore(state => state.getCompanyList())
  const handleSelectedCompany = useFeedbackItemsStore(state => state.selectCompany)
  return (
    <ul className="hashtags">
      {companyList.map(company => (<HashtagItem key={company} company={company} onSelectCompany={handleSelectedCompany} />))}
    </ul>
  )
}
