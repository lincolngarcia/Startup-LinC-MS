"use client";

import { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";
import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";
import "@aws-amplify/ui-react/styles.css";
import "./app.css"

Amplify.configure(outputs);

const client = generateClient<Schema>();

export default function App() {
  return (
    <main>
      <div className="large">
        <p>Welcome to</p>
        <div className="course">
          <div className="courseName">Web<br />Programming</div>
          <div className="courseNum">260</div>
        </div>
        <p id="serviceName">
          <a href="https://learn.cs260.click">Learn</a>
          <a href="https://simon.cs260.click">Simon</a>
          <a href="https://startup.cs260.click">Startup</a>
        </p>
      </div>
      <div className="small">
        <a href="https://learn.cs260.click">260</a>
      </div>
    </main>
  );
}