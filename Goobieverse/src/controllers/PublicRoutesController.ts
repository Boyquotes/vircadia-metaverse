import { MetaverseInfoInterface } from '../common/interfaces/MetaverseInfo';
import config from '../appConfig';
import {IsNotNullOrEmpty, readInJSON } from '../utils/Misc';

export const PublicRoutesController = ()=>{
    const metaverseInfo = async(req:any,res:any) => {
        const response:MetaverseInfoInterface = {
            metaverse_name:config.metaverse.metaverseName,
            metaverse_nick_name: config.metaverse.metaverseNickName,
            ice_server_url: config.metaverse.defaultIceServerUrl ,
            metaverse_url: config.metaverse.metaverseServerUrl,
            metaverse_server_version:{
                version_tag:config.server.version
            }
        };
        try {
            const additionUrl: string = config.metaverseServer.metaverseInfoAdditionFile;
            if (IsNotNullOrEmpty(additionUrl)) {
                const additional = await readInJSON(additionUrl);
                if (IsNotNullOrEmpty(additional)) {
                    response.metaverse_server_version = additional;
                }
            }
        }
        catch (err) {
            //console.error(`procMetaverseInfo: exception reading additional info file: ${err}`);
        }
        res.status(200).json(response);
    };
    return {metaverseInfo};
};