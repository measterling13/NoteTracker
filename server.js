const express = require("express");
const path = require("path");
const fs = require("fs");
const {v4: uuidv4} = require('uuid');

const PORT = 3002;

const app = express();
