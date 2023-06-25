export class APIEndpointURLs {
  private static readonly baseUrl = 'http://localhost:8080/java-api/api';

  // User
  public static readonly userUrl = APIEndpointURLs.baseUrl + '/user';
  public static readonly allUser = APIEndpointURLs.userUrl + '/all';
  public static readonly user = APIEndpointURLs.userUrl + '/id/';
  public static readonly myStuff = APIEndpointURLs.userUrl + '/stuff';
  public static readonly isManager = APIEndpointURLs.userUrl + '/isManager/';


  // Auth
  public static readonly authUrl = APIEndpointURLs.baseUrl + '/auth';
  public static readonly registerUrl = APIEndpointURLs.authUrl + '/register';
  public static readonly loginUrl = APIEndpointURLs.authUrl + '/login';

  // Book
  public static readonly bookUrl = APIEndpointURLs.baseUrl + '/book';
  public static readonly bookById = APIEndpointURLs.bookUrl + '/id/';
  public static readonly allBooks = APIEndpointURLs.bookUrl + '/all';
  public static readonly newBook = APIEndpointURLs.bookUrl + '/new';
  public static readonly book = APIEndpointURLs.bookUrl + '/id/';

  // Rating
  public static readonly ratingUrl : string = APIEndpointURLs.baseUrl + '/rating';
  public static readonly ratingsByBookId : string = APIEndpointURLs.ratingUrl + '/bookId/';
  public static readonly ratingsByUserId : string = APIEndpointURLs.ratingUrl + '/userId/';
  public static readonly ratingNew : string = APIEndpointURLs.ratingUrl + '/save';
  public static readonly ratingDelete = APIEndpointURLs.ratingUrl + '/delete/';


}
