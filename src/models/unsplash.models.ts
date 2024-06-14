export interface UnsplashImage {
  id: string;
  created_at: string;
  updated_at: string;
  width: number;
  height: number;
  color: string; // "#6E633A";
  blur_hash: string; // "LFC$yHwc8^$yIAS$%M%00KxukYIp";
  downloads: number;
  likes: number;
  liked_by_user: boolean;
  description: string; // "A man drinking a coffee.";
  location: {
    name: string; //"Montreal, Canada";
    city: string; //"Montreal";
    country: string; //"Canada";
    position: {
      latitude: number; // 45.473298;
      longitude: number; // -73.638488;
    };
  };
  urls: {
    raw: string; //"https://images.unsplash.com/photo-1417325384643-aac51acc9e5d";
    full: string; //"https://images.unsplash.com/photo-1417325384643-aac51acc9e5d?q=75&fm=jpg";
    regular: string; //"https://images.unsplash.com/photo-1417325384643-aac51acc9e5d?q=75&fm=jpg&w=1080&fit=max";
    small: string; //"https://images.unsplash.com/photo-1417325384643-aac51acc9e5d?q=75&fm=jpg&w=400&fit=max";
    thumb: string; //"https://images.unsplash.com/photo-1417325384643-aac51acc9e5d?q=75&fm=jpg&w=200&fit=max";
  };
  links: {
    self: "https://api.unsplash.com/photos/Dwu85P9SOIk";
    html: "https://unsplash.com/photos/Dwu85P9SOIk";
    download: "https://unsplash.com/photos/Dwu85P9SOIk/download";
    download_location: "https://api.unsplash.com/photos/Dwu85P9SOIk/download";
  };
  user: {
    id: "QPxL2MGqfrw";
    updated_at: "2016-07-10T11:00:01-05:00";
    username: "exampleuser";
    name: "Joe Example";
    portfolio_url: "https://example.com/";
    bio: "Just an everyday Joe";
    location: "Montreal";
    total_likes: 5;
    total_photos: 10;
    total_collections: 13;
    instagram_username: "instantgrammer";
    twitter_username: "crew";
    links: {
      self: "https://api.unsplash.com/users/exampleuser";
      html: "https://unsplash.com/exampleuser";
      photos: "https://api.unsplash.com/users/exampleuser/photos";
      likes: "https://api.unsplash.com/users/exampleuser/likes";
      portfolio: "https://api.unsplash.com/users/exampleuser/portfolio";
    };
  };
}
