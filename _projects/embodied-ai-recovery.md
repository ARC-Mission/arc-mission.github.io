---
title: "Embodied AI: Autonomous Recovery with Reasoning LLMs"
status: "Active"
description: "The flagship ARC-M project: Engineering an Embodied AI agent that uses Reasoning LLMs (Magistral) to supervise RL training in Isaac Sim, enabling autonomous recovery in unstructured environments."
slug: "embodied-ai-recovery"
cover: "/assets/projects/embodied_recovery.jpg"
order: 1
focusAreas:
  - "Embodied AI"
  - "Reasoning LLMs"
  - "NVIDIA Isaac Sim"
  - "ROS 2"
---

## Overview

The flagship ARC-M project: Engineering an Embodied AI agent that uses Reasoning LLMs (Magistral) to supervise Reinforcement Learning (RL) training in Isaac Sim, enabling autonomous recovery in unstructured environments.

## Vision

To move beyond static "if-then" recovery scripts and create an agent that **learns** physical resilience. We are building a Hierarchical Reinforcement Learning (HRL) system where:
1.  **The "Manager" (Reasoning LLM)**: A model (Mistral's Magistral) that analyzes the situation and sets high-level goals (e.g., "The front right leg is trapped; apply high torque to the rear left to pivot").
2.  **The "Worker" (RL Policy)**: A neural network trained via PPO (Proximal Policy Optimization) that learns the precise motor torques required to execute that goal through millions of trial-and-error steps in simulation.

## The Challenge

Pure Reinforcement Learning is notoriously difficult to train for long-horizon tasks (like "get out of this collapsed building") because the reward signal is too sparse. Conversely, LLMs have common sense but cannot output the 100Hz motor commands needed to balance a robot.

By combining them, we solve the **"Sparse Reward Problem"**: The Reasoning LLM decomposes the impossible long-term task into achievable short-term learning objectives.

## Technical Approach

### 1. Simulation Framework: Isaac Lab
We utilize **NVIDIA Isaac Lab** (built on Isaac Sim) to parallelize training. We spawn 4,096 robot instances simultaneously on a single GPU. This allows our agent to experience years of "getting stuck" and "recovering" in just a few hours of wall-clock time [[1](#ref-1)].

### 2. The Learning Pipeline (The "Eureka" Moment)
We implement an LLM-guided Reward Design approach (similar to NVIDIA's Eureka research):
*   **Observation**: The robot gets stuck in debris.
*   **Reasoning**: Magistral (24B) analyzes the state vector and suggests a reward function code snippet (e.g., `reward = forward_velocity + 0.5 * debris_displacement`).
*   **Training**: The RL agent trains against this generated reward function using **PPO**.
*   **Feedback Loop**: If the agent fails to learn, Magistral analyzes the training logs and refines the reward function (e.g., "The agent is jittering too much; adding a penalty for torque smoothness").

### 3. Skill Library & ROS 2 Integration
The outcome is a **Library of Neural Skills** (e.g., `push_heavy_object`, `crawl_under_gap`). At runtime, the Reasoning LLM acts as a ROS 2 node, selecting which learned policy to activate based on environmental data.

## Deliverables

1.  **Learned Recovery Policies**: A set of robust neural network weights (ONNX format) capable of executing recovery maneuvers that were never explicitly programmed.
2.  **Isaac Lab Training Scripts**: Open-source Python scripts demonstrating how to use an open-weights reasoning model to supervise RL training cycles.
3.  **Sim-to-Real Validation**: Deploying the learned `flip_self_upright` policy on a real Unitree Go2 or TurtleBot to verify that the physics intuition learned in Isaac Sim transfers to reality.

## Partner Tie-In

We are leveraging the **Munich School of Robotics and Machine Intelligence (MSRM)** network to validate our RL baselines against state-of-the-art control theory approaches.

## Collaboration Opportunities

We are actively looking for contributors for:

- **Reward Engineering**: Helping refine the prompt templates that guide Magistral in writing stable reward functions.
- **Sim-to-Real Gap**: Implementing Domain Randomization (DR) techniques to ensure our RL agents are robust to real-world friction and sensor noise.
- **Multi-Agent RL**: Expanding the scope to train teams of robots to coordinate recovery.

## References

<span id="ref-1">1.</span> [Isaac Lab: A Modular Framework for Robot Learning in Isaac Sim](https://arxiv.org/abs/2405.14734) (2024). NVIDIA arXiv.

<span id="ref-2">2.</span> [Eureka: Human-Level Reward Design via Coding Large Language Models](https://eureka-research.github.io/) (2024). Ma et al.

<span id="ref-3">3.</span> [Magistral: Europe's First Open Reasoning Model](https://mistral.ai/news/mistral-large-reasoning-and-magistral/) (2025). Mistral AI Engineering Blog.

## Get Involved

We are teaching robots to learn from their mistakes so they don't fail when it counts. If you have experience with **PyTorch**, **Reinforcement Learning**, or **NVIDIA Omniverse**, join us in building the next generation of resilient agents.