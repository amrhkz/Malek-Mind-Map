import Container from "@/component/container/container";
import React from "react";
import style from "./mind.module.css";

function page() {
  return (
    <Container>
      <div className={style.content}>
        <i className="bx bx-brain"></i>
      </div>
    </Container>
  );
}

export default page;
