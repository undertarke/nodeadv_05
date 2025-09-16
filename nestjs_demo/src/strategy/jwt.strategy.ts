import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy,"jwt") {
    constructor() {
        super({
            jwtFromRequest:
                ExtractJwt.fromAuthHeaderAsBearerToken(), // authorization
            ignoreExpiration: false, // hết hạn (expiresIn)
            secretOrKey: "KHOA_BI_MAT",
        });
    }
    async validate(payload: any) {
        return payload;
    }
}