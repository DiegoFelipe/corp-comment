import { create } from "zustand";
import { TFeedbackItem } from "../lib/types";

type Store = {
  feedbackItems: TFeedbackItem[];
  isLoading: boolean;
  errorMessage: string;
  selectedCompany: string;
  getCompanyList: () => string[];
  getFilteredFeedbackItems: () => TFeedbackItem[];
  addItemToList: (text: string) => Promise<void>;
  selectCompany: (company: string) => void;
  fetchFeedbackItems: () => Promise<void>;
};

export const useFeedbackItemsStore =
  create<Store>((set, get) => ({
    feedbackItems: [],
    isLoading: false,
    errorMessage: "",
    selectedCompany: "",
    getCompanyList: () => {
      return get()
        .feedbackItems.map((item) => item.company)
        .filter(
          (company, index, array) =>
            array.indexOf(company) === index
        );
    },
    getFilteredFeedbackItems: () => {
      const state = get();
      return state.selectedCompany !== ""
        ? state.feedbackItems.filter(
            (item) =>
              item.company ===
              state.selectedCompany
          )
        : state.feedbackItems;
    },
    addItemToList: async (text: string) => {
      const companyName = text
        .split(" ")
        .find((word) => word.includes("#"))!
        .substring(1);

      const newItem: TFeedbackItem = {
        id: new Date().getTime(),
        upvoteCount: 0,
        daysAgo: 0,
        text: text,
        company: companyName,
        badgeLetter: companyName
          .substring(0, 1)
          .toUpperCase(),
      };

      set((state) => ({
        feedbackItems: [
          ...state.feedbackItems,
          newItem,
        ],
      }));

      await fetch(
        "https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks",
        {
          method: "POST",
          body: JSON.stringify(newItem),
          headers: {
            Accept: "application/json",
            "Content-type": "application/json",
          },
        }
      );
    },
    selectCompany: (company: string) => {
      // setSelectedCompany(company);
      set(() => ({
        selectedCompany: company,
      }));
    },
    fetchFeedbackItems: async () => {
      try {
        set(() => ({
          isLoading: true,
        }));

        const result = await fetch(
          "https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks"
        );

        if (!result.ok) {
          throw new Error();
        }
        const data = await result.json();
        //   setFeedbackItems(data.feedbacks);
        set(() => ({
          feedbackItems: data.feedbacks,
        }));
      } catch (error) {
        //   setErrorMessage("something went wrong.");
        set(() => ({
          errorMessage: "something went wrong.",
        }));
      }
      // setIsLoading(false);
      set(() => ({
        isLoading: false,
      }));
    },
  }));
