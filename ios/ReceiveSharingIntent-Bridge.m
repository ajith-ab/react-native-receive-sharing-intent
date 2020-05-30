//
//  ReceiveSharingIntent-Bridge.m
//  ReceiveSharingIntent
//
//  Created by Ajith A B on 30/05/20.
//  Copyright © 2020 Facebook. All rights reserved.
//


#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(ReceiveSharingIntent, NSObject)
    RCT_EXTERN_METHOD(getFileNames:(NSString *)url)
@end
