import { _404Page } from "./components/404";
import { HomePage } from "./components/home";
import { InterviewsPage, NewInterviewPage, InterviewPage } from "./components/interviews";
import { ParticipantsPage , ParticipantPage, NewParticipantPage } from "./components/participants";

export const routes = [];

routes.push(_404Page);
routes.push(HomePage);
routes.push(InterviewsPage);
routes.push(NewInterviewPage);
routes.push(ParticipantsPage);
routes.push(ParticipantPage);
routes.push(NewParticipantPage);
routes.push(InterviewPage);
