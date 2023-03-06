import pickle
import json
import numpy as np

__locations = None
__data_columns = None
__model = None


# Pass form data to prediction model
def get_estimated_price(location, sqft, bhk, bath, resale, pool, jog_track):
        try:
            loc_index = __data_columns.index(location.lower())
        except:
            loc_index = -1

        
        x = np.zeros(len(__data_columns))
        x[0] = sqft
      
        x[1] = bhk
        x[2] = resale
        x[3] = pool
        x[4] = jog_track
        if loc_index >= 0:
            x[loc_index] = 1

        return round(__model.predict([x])[0], 2)


def load_saved_artifacts():  # Load the pickle and json file
    print("Loading saved artifacts...start")
    global __data_columns
    global __locations

    with open("./artifacts/columns_1.json", "r") as f:
        __data_columns = json.load(f)['data_columns']
        __locations = __data_columns[4:]  # locations start from 4 column

    global __model
    if __model is None:
        with open('./artifacts/model_pkl_blr', 'rb') as f:
            __model = pickle.load(f)
    print("Loading saved artifacts...done")


def get_location_names():
    return __locations


def get_data_columns():
    return __data_columns


if __name__ == '__main__':
    load_saved_artifacts()
