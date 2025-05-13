import dotenv from 'dotenv'
dotenv.config({
    path: '../.env'
});


const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    ssl: {
      rejectUnauthorized: true // Required for Azure MySQL
    }
  });

//   const username = process.env.DB_USER;
// const password = process.env.DB_PASSWORD;
// const host = process.env.SQL_HOST;
// const database = process.env.DB_NAME;
// const port = process.env.DB_PORT;

// const connection = mysql.createConnection({
//     host: host,
//     user: username,
//     password: password,
//     database: database,
//     port: port
// });
export default pool;;

// DB_PORT=3306
// DB_USER=bby17
// DB_PASSWORD=LjLkLbby17
// DB_NAME=comp2800-recipedia
// SQL_HOST='comp2800-recipedia.mysql.database.azure.com'

// #Database configuration:
// Resource group: BCIT_CST_COMP2800

// Server name: comp2800-recipedia

// Location: Canada Central

// Username: bby17 #Same as the one used for MySQL connection

// Password: LjLkLbby17 #Same as the one used for MySQL connection

// GUID: aa806412-1bfe-48cb-a154-fa222ec8e842

// Firewall Rule Naming: firewall-rule-$yourfirstname


// #Powershell script to create a firewall rule for the Azure SQL Database server

// # Start by logging into Azure
// az login

// # === CONFIGURE THESE VARIABLES ===
// $resourceGroup = "BCIT_CST_COMP2800"
// $serverName = "comp2800-recipedia"
// $ruleName = "firewall-rule-$yourfirstname" # Replace with your first name (all lowercase)

// # === GET PUBLIC IP ===
// $ip = Invoke-RestMethod -Uri "https://api.ipify.org"

// # === UPDATE FIREWALL RULE ===
// az mysql server firewall-rule create `
//   --resource-group $resourceGroup `
//   --server-name $serverName `
//   --name $ruleName `
//   --start-ip-address $ip `
//   --end-ip-address $ip

// Write-Output "Firewall rule updated for IP $ip"


// #Bash Script for creating a firewall rule for the Azure SQL Database server (Leslie's version)
// #!/bin/bash

// # === CONFIGURE THESE VARIABLES ===
// RESOURCE_GROUP="BCIT_CST_COMP2800"
// MYSQL_SERVER_NAME="comp2800-recipedia"
// RULE_NAME="firewall-rule-leslie"  

// # === GET PUBLIC IP ===
// MY_IP=$(curl -s https://api.ipify.org)

// # === UPDATE FIREWALL RULE ===
// echo "Updating Azure MySQL firewall rule for IP: $MY_IP"

// az mysql server firewall-rule create \
//   --resource-group "$RESOURCE_GROUP" \
//   --server-name "$MYSQL_SERVER_NAME" \
//   --name "$RULE_NAME" \
//   --start-ip-address "$MY_IP" \
//   --end-ip-address "$MY_IP"

// echo "Firewall rule updated successfully!"

// # To run the script, save it as update-azure-firewall.sh and give it execute permissions:

// bash update-azure-firewall.sh


