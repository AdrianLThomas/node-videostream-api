import { DynamoDB } from "aws-sdk";
import { UpdateItemInput } from "aws-sdk/clients/dynamodb";
import { IActiveUserRepository } from "./active-user-repository.interface";
import { ActiveUser } from "./active-user.model";

export class DynamoDbActiveUserRepository implements IActiveUserRepository {
	private readonly db = new DynamoDB.DocumentClient();

	constructor(public readonly tableName = "activeUsers") {
	}

	public async getWatchCountAsync(inputUsername: string): Promise<number> {
		if (!inputUsername) {
			throw new Error("parameter: 'inputUsername' was not provided");
		}

		const user = await this.getUserAsync(inputUsername);

		if (user) {
			return user.watchCount;
		}

		return user ? user.watchCount : 0;
	}

	public async setWatchCountAsync(inputUsername: string, inputWatchCount: number): Promise<void> {
		if (!inputUsername) {
			throw new Error("parameter: 'inputUsername' was not provided");
		}

		const user = await this.getUserAsync(inputUsername);

		if (user) {
			const params = {
				ExpressionAttributeValues: { ":w": inputWatchCount },
				Key: {username: inputUsername},
				TableName: this.tableName,
				UpdateExpression: "SET watchCount =:w",
			};

			await this.db.update(params).promise();
		} else {
			const params = {
				Item: {username: inputUsername, watchCount: inputWatchCount},
				TableName: this.tableName,
			};

			await this.db.put(params).promise();
		}
	}

	private async getUserAsync(inputUsername: string): Promise<ActiveUser> {
		const params = {
			Key: {username: inputUsername},
			TableName: this.tableName,
		};
		const dbResult = await this.db.get(params).promise();
		const user = dbResult.Item as ActiveUser;

		return user;
	}
}
