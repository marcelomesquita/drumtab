import axios from 'axios';
import { project } from './project';

export default axios.create({
  baseURL: project.url
});
