import { body } from "express-validator";
import db from "../db/modle/index.js";

class ShareValidator {
    create = [
        body('email')
            .isEmail()
            .normalizeEmail()
            .withMessage('Must provide a valid email to share this document with.'),
        body('email').custom(async (value) => {
            const user = await db.User.findOne({
                where: {
                    email: value
                }
            })
            if (!user) {
                throw new Error('This user is not registred on this platform');
            } else {
                return true;
            }
        }),
    ]
}

const shareValidator = new ShareValidator();

export default shareValidator;