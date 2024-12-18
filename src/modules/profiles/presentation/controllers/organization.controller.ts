import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { OrganizationService } from '@modules/profiles/application/services/organization.service';
import { OrganizationProfileDataDto } from '@modules/profiles/domain/dto/organization-profile.dto';
import { Organization } from '@modules/profiles/domain/entities/organization.entity';
import { JwtAuthGuard } from '@modules/auth/guards/jwt-auth.guard';

@ApiTags('organizations')
@Controller('organizations')
@UseGuards(JwtAuthGuard)
export class OrganizationController {
  constructor(private readonly organizationService: OrganizationService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new organization profile' })
  @ApiResponse({
    status: 201,
    description: 'The organization profile has been successfully created.',
    type: Organization,
  })
  async createOrganization(@Body() createOrganizationDto: OrganizationProfileDataDto): Promise<Organization> {
    return this.organizationService.createProfile(createOrganizationDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an organization profile by ID' })
  @ApiResponse({
    status: 200,
    description: 'The organization profile has been successfully retrieved.',
    type: Organization,
  })
  async getOrganizationById(@Param('id') id: string): Promise<Organization> {
    return this.organizationService.getProfileById(id);
  }

  @Get('user/:userId')
  @ApiOperation({ summary: 'Get an organization profile by user ID' })
  @ApiResponse({
    status: 200,
    description: 'The organization profile has been successfully retrieved.',
    type: Organization,
  })
  async getOrganizationByUserId(@Param('userId') userId: string): Promise<Organization> {
    return this.organizationService.getProfileByUserId(userId);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an organization profile' })
  @ApiResponse({
    status: 200,
    description: 'The organization profile has been successfully updated.',
    type: Organization,
  })
  async updateOrganization(
    @Param('id') id: string,
    @Body() updateOrganizationDto: Partial<Organization>,
  ): Promise<Organization> {
    return this.organizationService.updateProfile(id, updateOrganizationDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an organization profile' })
  @ApiResponse({
    status: 200,
    description: 'The organization profile has been successfully deleted.',
  })
  async deleteOrganization(@Param('id') id: string): Promise<boolean> {
    return this.organizationService.deleteProfile(id);
  }

  @Get()
  @ApiOperation({ summary: 'Get all organization profiles' })
  @ApiResponse({
    status: 200,
    description: 'All organization profiles have been successfully retrieved.',
    type: [Organization],
  })
  async getAllOrganizations(): Promise<Organization[]> {
    return this.organizationService.getAllOrganizations();
  }

  @Get('location/:location')
  @ApiOperation({ summary: 'Get organizations by location' })
  @ApiResponse({
    status: 200,
    description: 'Organizations in the specified location have been successfully retrieved.',
    type: [Organization],
  })
  async getOrganizationsByLocation(@Param('location') location: string): Promise<Organization[]> {
    return this.organizationService.getOrganizationsByLocation(location);
  }
}
