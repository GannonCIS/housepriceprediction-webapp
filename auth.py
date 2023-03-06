import boto3
from pprint import pprint

userpool = 'us-east-1_J9jLFvP4s'
client_id = '4tfc55pgnq582vidbu89kk7sep'

cidp = boto3.client('cognito-idp', region_name='us-east-1',aws_access_key_id='AKIARDIHS3UTPMUDBAQR',aws_secret_access_key='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')


def confirm_forgot_password(email, password, code):
    response = cidp.confirm_forgot_password(
        ClientId=client_id,
        Username=email,
        Password=password,
        ConfirmationCode=code
    )
    return response


def forgot_password(email):
    response = cidp.forgot_password(
        ClientId=client_id,
        Username=email
    )
    pprint(response)
    return response


def confirm_user(email, code):
    response = cidp.confirm_sign_up(
        ClientId=client_id,
        Username=email,
        ConfirmationCode=code
    )
    return response

# confirm_user(email,'881272')


def create_user(email, password):
    response = cidp.sign_up(
        ClientId=client_id,
        Username=email,
        Password=password
    )
    return response

# create_user(email,password)


def get_token(username, password):

    response = cidp.initiate_auth(
        AuthFlow='USER_PASSWORD_AUTH',
        AuthParameters={
            'USERNAME': username,
            'PASSWORD': password},
        ClientId=client_id
    )

    access_token = response['AuthenticationResult']['AccessToken']
    id_token = response['AuthenticationResult']['IdToken']
    refresh_token = response['AuthenticationResult']['RefreshToken']

    return {'AccessToken': access_token, 'IdToken': id_token, 'RefreshToken': refresh_token}

# get_token(email,password)


def verify_token(access_token):
    try:
        cidp.get_user(
            AccessToken=access_token
        )
        return True
    except:
        return False


def expire_token(access_token):
    try:
        cidp.global_sign_out(
            AccessToken=access_token
        )
        return True
    except:
        return False
