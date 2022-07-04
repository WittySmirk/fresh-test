const GetUrl = (req: Request, route: string): string => {
  return 'http://' + req.headers.get('host') + route;
};

export default GetUrl;
