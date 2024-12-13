import { ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import * as moment from 'moment';


@ValidatorConstraint()
export class IsValidDate implements ValidatorConstraintInterface {

    validate(value: any) {
      return typeof value === 'string' && moment(new Date(value)).isValid()
    }
  
    defaultMessage({value, property}) {
      return `Invalid date (${ value }) formatted for ${property}`;
    }
  }
  