

import React, { useEffect, useState } from "react";
import { apiRequest } from "../api";

export default function InsightsPanel({ refreshFlag }) {
  const [insights, setInsights] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchInsights = async () => {
    setLoading(true);
    try {
      const data = await apiRequest("/insights", "GET", null, true);
      setInsights(data);
    } catch (err) {
      console.error("Error loading insights:", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchInsights();
  }, [refreshFlag]); 
  if (loading) return <div className="insights">Loading insights...</div>;

  return (
    <div className="insights">
      <h3>Smart Insights</h3>
      <p>{insights.summary}</p>
      <ul>
        <li>Open Tasks: {insights.totalOpen}</li>
        <li>Due Soon: {insights.dueSoon}</li>
      </ul>
      <h4>Priority Breakdown:</h4>
      <ul>
        {insights.priorityCount.map((p) => (
          <li key={p.priority}>
            {p.priority}: {p.c}
          </li>
        ))}
      </ul>
    </div>
  );
}
