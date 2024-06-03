import { Client, Account } from "appwrite";

const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("664b025500172e0cc60b");

const account = new Account(client);

export { account, client };
