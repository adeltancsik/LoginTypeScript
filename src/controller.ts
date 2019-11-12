//you can remove src/controller.ts after setting the index.ts controller, bc Controller is now not imported there

import { Controller, Get } from "routing-controllers";

@Controller()
export default class MainController {
  @Get("/hello")
  main() {
    return {
      hello: "World!!!"
    };
  }
}
