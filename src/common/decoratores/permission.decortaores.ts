import { SetMetadata } from "@nestjs/common";
import { PermissionsEnum } from "../enums/permission.dto";
export const PermissionDecortaor = (...permissions:[PermissionsEnum,...PermissionsEnum[]])=> SetMetadata('permissions',permissions);