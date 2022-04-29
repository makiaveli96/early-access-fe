import mixpanel from'mixpanel-browser';
mixpanel.init("554f8ed17c9b8b395075621942fe2412");

export function track(eventName: string, props: any, incrementAction?: boolean){
  if(incrementAction == true){
    mixpanel.people_increment({ eventName: 1 });
  }
  mixpanel.track(eventName, {...props, time: new Date().toString()});
}