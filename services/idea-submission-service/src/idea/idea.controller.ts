import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  NotFoundException,
} from "@nestjs/common";
import { IdeaService } from "./idea.service";
import { StartupIdea } from "./models/startup-idea.model";

@Controller("idea")
export class IdeaController {
  constructor(private readonly ideaService: IdeaService) {}

  @Post()
  create(@Body() idea: StartupIdea) {
    return this.ideaService.create(idea);
  }

  @Get()
  findAll() {
    return this.ideaService.findAll();
  }

  @Get(":id")
  findById(@Param("id") id: string) {
    return this.ideaService.findById(id);
  }
  @Put(":id")
  update(@Param("id") id: string, @Body() updatedIdea: StartupIdea) {
    try {
      return this.ideaService.update(id, updatedIdea);
    } catch (error) {
      // Check if error is an instance of Error
      if (error instanceof Error) {
        throw new NotFoundException(error.message); // Return a 404 with the error message
      } else {
        throw new NotFoundException("An unknown error occurred"); // Return a generic error message
      }
    }
  }

  @Delete(":id")
  delete(@Param("id") id: string) {
    const isDeleted = this.ideaService.delete(id);
    if (!isDeleted) {
      throw new NotFoundException(`Idea with id ${id} not found`);
    }
    return { message: "Idea deleted successfully" };
  }
}
