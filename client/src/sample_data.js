const sampleData = {
  users: 
    [
      {
        ID: 1,
        userHandle: 'samplemuser',
        userName: 'SUZIES.',
        userLoc: 'New York, NY',
        photoUrl: 'https://pbs.twimg.com/media/BcINeMVCIAABeWd.jpg',
        bio: 'suzie is a sample user who loves to sample foodstuffs',
        email: 'suzie@samplemouse.com',
        follower_count: 2,
        following_count: 10,
        hashtags: ['food', 'cheese']
      },
      {
        ID: 2,  
        userHandle: 'gusCheeserson',
        userName: 'GusPopstar',
        userLoc: 'Washington',
        photoUrl: 'http://i.imgur.com/FsaErgQ.jpg',
        bio: 'gus plays the guitar with his teeth and stuff',
        email: 'gus@nowhere.com',    
        follower_count: 20,
        following_count: 10000,
        hashtags: ['guitar', 'teeth']
      }
    ],
  posts:
    [
      {
        users_id: 1,
        postLoc: 'The harbor',
        body: 'I visited the harbor. It was brown.',
        photoUrl: 'https://wallpaperbrowse.com/media/images/pictures-14.jpg',
        like_counter: 14
      },
      {
        users_id: 1,
        postLoc: 'West Virginia',
        body: 'The place where I belong.',
        photoUrl: 'https://wallpaperbrowse.com/media/images/pictures-14.jpg',
        like_counter: 14
      },
      {
        users_id: 2,
        postLoc: 'The English Channel',
        body: 'There\'s so much static here!',
        photoUrl: 'https://wallpaperbrowse.com/media/images/pictures-14.jpg',
        like_counter: 8000
      },   
      {
        users_id: 2,
        postLoc: 'Meryl\'s playpen',
        body: 'This place is like disneyland for the obese',
        photoUrl: 'https://wallpaperbrowse.com/media/images/pictures-14.jpg',
        like_counter: 1337
      },  
    ]
};



export default sampleData;
