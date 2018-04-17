const sampleData = {
  users: 
    [
      {
        ID: 1,
        userHandle: 'samplemuser',
        userName: 'SUZIES.',
        userLoc: 'New York, NY',
        photoUrl: 'pbs.twimg.com/media/BcINeMVCIAABeWd.jpg',
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
        photoUrl: 'pbs.twimg.com/media/BcINeMVCIAABeWd.jpg',
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
        ID: 1,
        users_id: 1,
        postLoc: 'The harbor',
        body: 'I visited the harbor. IT WAS BROWN.',
        photoUrl: 'source.unsplash.com/1600x900/?featured/?cat,robots',
        like_counter: 14,
        createdAt: Date.now()
      },
      {
        ID: 2,
        users_id: 1,
        postLoc: 'West Virginia',
        body: 'The place where I belong.',
        photoUrl: 'source.unsplash.com/1600x900/?featured/?dog,cat',
        like_counter: 14,
        createdAt: Date.now()
      },
      {
        ID: 3,
        users_id: 2,
        postLoc: 'The English Channel',
        body: 'There\'s so much static here!',
        photoUrl: 'source.unsplash.com/1600x900/?featured/?robots',
        like_counter: 8000,
        createdAt: Date.now()
      },   
      {
        ID: 4,
        users_id: 2,
        postLoc: 'Meryl\'s playpen',
        body: 'This place is like disneyland for the obese',
        photoUrl: 'source.unsplash.com/1600x900/?featured/?cat',
        like_counter: 1337,
        createdAt: Date.now()
      },  
    ]
};



export default sampleData;
