import { BaseDatabase } from "./BaseDatabase";

export class UserConnectionDatabase extends BaseDatabase {
  private static TABLE_NAME = "UserFollowConnection"

  public async follow(followerId:string, followedId:string): Promise<void> {
      await this.setConnection()
          .insert({
            followed_id: followedId,
            follower_id: followerId
          })
          .into(UserConnectionDatabase.TABLE_NAME)
  }

  public async unfollow(followerId:string, followedId:string): Promise<void> {
      await this.setConnection()
        .delete()
        .from(UserConnectionDatabase.TABLE_NAME)
        .where({followed_id: followedId})
        .andWhere({follower_id: followerId})
  }
}