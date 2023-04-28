export class AppSettings  {
    private static API_ENDPOINT='https://ezy.works/api/'
    //private static API_ENDPOINT='http://127.0.0.1:5000/'

    public static getEndpointWithService(serviceName: string) : string{
        return AppSettings.API_ENDPOINT + serviceName + '/';
    }
}