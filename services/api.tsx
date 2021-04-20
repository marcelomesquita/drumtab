import axios from 'axios';
import { PROJECT } from '../project';

export default axios.create({
  baseURL: PROJECT.URL
});
