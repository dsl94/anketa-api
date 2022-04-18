import { Body, Controller, Post, Req, UseGuards } from "@nestjs/common";
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";
import { AuthService } from "./auth.service";
import { AuthGuard } from "@nestjs/passport";

@Controller('auth')
export class AuthController {

  constructor(private authService: AuthService) {
  }

  @Post("/signup")
  signUp(@Body() credentialsDto: AuthCredentialsDto): Promise<void> {
    return this.authService.signUp(credentialsDto);
  }

  @Post("/signin")
  signIn(@Body() credentialsDto: AuthCredentialsDto): Promise<{ accessToken: string }> {
    return this.authService.signIn(credentialsDto);
  }

  @Post("/test")
  @UseGuards(AuthGuard())
  test(@Req() req) {
    console.log(req);
  }
}
