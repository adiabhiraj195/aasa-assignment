import db from "../db/modle/index.js";
import { Op } from "sequelize";
import { Document } from "../db/modle/document.modle.js";

class DocumentService {
    findDocumentById = async (id, userId) => {
        let document = await db.Document.findOne({
            where:{
                [Op.or]: [
                    {
                        id: id,
                        userId: userId,
                    },
                    {
                        id: id,
                        isPublic: true
                    }
                ]
            },
        });
        // console.log(document, 'this is finded doc')

        if(!document){
            const sharedDocument = await db.DocumentUser.findAll({
                where:{
                    documentId: id,
                    userId: userId
                },
                include: {
                    model: Document
                },
            });

            if(!sharedDocument) return null;
            // console.log(sharedDocument[0].document, "This is shared doc");
            document = sharedDocument[0].document;
        }

        return document;
    }
}

const documentService = new DocumentService();

export default documentService;