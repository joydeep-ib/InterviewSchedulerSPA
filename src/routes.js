import { _404Page } from "./components/404";
import { HomePage } from "./components/home";
import { InterviewsPage, NewInterviewPage } from "./components/interviews";
import { ParticipantsPage } from "./components/participants";

export const routes = [];

routes.push(_404Page);
routes.push(HomePage);
routes.push(InterviewsPage);
routes.push(NewInterviewPage);
routes.push(ParticipantsPage)