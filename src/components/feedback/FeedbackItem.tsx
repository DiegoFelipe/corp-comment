import { useState } from "react";
import { TriangleUpIcon } from "@radix-ui/react-icons"
import { TFeedbackItem } from "../../lib/types";

type FeedbackItemProps = {
    feedbackitem: TFeedbackItem;
}

export default function FeedbackItem({ feedbackitem }: FeedbackItemProps) {
    const [open, setOpen] = useState(false)
    const [upVote, setUpVote] = useState(0)

    const handleClick = () => {
        setOpen(!open)
    }

    const handleUpvote = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setUpVote(prev => prev + 1)
        e.currentTarget.disabled = true
        e.stopPropagation()
    }


    return (
        <li className={`feedback ${open ? "feedback--expand" : null}`} onClick={handleClick}>
            <button onClick={handleUpvote}>
                <TriangleUpIcon />
                <span>{feedbackitem.upvoteCount + upVote}</span>
            </button>
            <div>
                <p>{feedbackitem.badgeLetter}</p>
            </div>
            <div>
                <p>{feedbackitem.company}</p>
                <p>{feedbackitem.text}</p>
            </div>
            <p>{feedbackitem.daysAgo === 0 ? "NEW" : `${feedbackitem.daysAgo}d`}</p>
        </li>
    )
}
