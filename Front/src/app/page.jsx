import "@/app/home.css";
import Banner from "@/component/banner/banner";
import Calendar from "@/component/calendar/calendar";
import Container from "@/component/container/container";
import EventTimerList from "@/component/event-timer/event-timer-list/event-timer-list";
import GoalCard from "@/component/goal-card/goal-card";
import MainGoalLoading from "@/component/loading/main-goal-loading/main-goal-loading";
import ShineList from "@/component/shine-list/shine-list";
import TimerList from "@/component/timer-list/timer-list";
import TopHabits from "@/component/top-habits/top-habits";
import TopTasks from "@/component/top-tasks/top-tasks";
import { Suspense } from "react";

export default function Home() {
  return (
    <Container>
      <Banner />
      <div className="flex px-[24px]">
        <div className="flex w-full justify-between">
          <div className="flex flex-col gap-5">
            <TopTasks />
            <Suspense fallback={<MainGoalLoading />}>
              <GoalCard />
            </Suspense>
            {/* <TopHabits /> */}
          </div>
          <div className="flex flex-col gap-[24px]">
            <TimerList />
            <EventTimerList />
            <ShineList />
          </div>
        </div>
      </div>
      <div className="flex p-[24px]">
        <Calendar />
      </div>
    </Container>
  );
}
