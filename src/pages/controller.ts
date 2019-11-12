import {
  JsonController,
  Get,
  Param,
  Put,
  Body,
  Post,
  HttpCode,
  NotFoundError,
  Authorized
} from "routing-controllers";
import Page from "./entity";

// type PageList = { pages: Page[] };

// this makes sure a class is marked as controller that always returns JSON
// perfect for our REST API
@JsonController()
export default class PageController {
  // this markes a method as endpoint
  // in this case it responds to any GET /pages/:id
  // request with :id being a variable parameter
  @Get("/pages/:id")
  getPage(
    // this decorator retrieves the ID parameter from the url
    @Param("id") id: number
  ) {
    return Page.findOne(id);
  }

  //   @Get("/pages")
  //   allPages(): PageList {
  //     //mapping overt the object pagesById and setting the result array as a value to "pages" key
  //     return { pages: Object.values(pagesById) };
  //   }
  @Get("/pages")
  async allPages() {
    const pages = await Page.find();
    return { pages };
  }

  //   @Put("/pages/:id")
  //   updatePage(@Param("id") id: number, @Body() body: Partial<Page>): Page {
  //     console.log(`Incoming PUT body param:`, body);
  //     return pagesById[id];
  //   }
  @Put("/pages/:id")
  async updatePage(@Param("id") id: number, @Body() update: Partial<Page>) {
    // ... implement
    const page = await Page.findOne(id);
    if (!page) throw new NotFoundError("Cannot find page");
    return Page.merge(page, update).save();
  }

  //   @Post("/pages")
  //   @HttpCode(201)
  //   createPage(@Body() body: Page): Page {
  //     console.log(`Incoming POST body param:`, body);
  //     return body;
  //   }
  @Authorized()
  @Post("/pages")
  @HttpCode(201)
  createPage(@Body() page: Page) {
    return page.save();
  }
}
