import { Injectable } from "@nestjs/common";
import { StartupIdea } from "./models/startup-idea.model";

@Injectable()
export class IdeaService {
  private ideas: StartupIdea[] = [];

  // Create a new idea
  create(idea: StartupIdea): StartupIdea {
    this.ideas.push(idea);
    return idea;
  }

  // Get all submitted ideas
  findAll(): StartupIdea[] {
    return this.ideas;
  }

  // Get a specific idea by ID
  findById(id: string): StartupIdea {
    const idea = this.ideas.find((idea) => idea.id === id);
    if (!idea) {
      throw new Error(`Idea with id ${id} not found`);
    }
    return idea;
  }

  // Update an existing idea by ID
  update(id: string, updatedIdea: StartupIdea): StartupIdea {
    const index = this.ideas.findIndex((idea) => idea.id === id);
    if (index > -1) {
      this.ideas[index] = updatedIdea;
      return updatedIdea;
    }
    throw new Error(`Idea with id ${id} not found`); // Throw an error if the idea is not found
  }

  // Delete an idea by ID
  delete(id: string): boolean {
    const index = this.ideas.findIndex((idea) => idea.id === id);
    if (index > -1) {
      this.ideas.splice(index, 1);
      return true;
    }
    return false;
  }
}
