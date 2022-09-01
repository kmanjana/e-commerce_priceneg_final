import sys

# print(sys.argv[1])
# print(sys.argv[2])
# fl=[[425.21283]]
# print(fl[0][0])

from tensorflow import keras

# import numpy as np


# # Make NumPy printouts easier to read.
# np.set_printoptions(precision=3, suppress=True)

mod_el = keras.models.load_model('E:/final yr project/e-com_web_priceneg_chatbot/priceneg_v3')
# mod_el.summary()
arg1 = float(sys.argv[1])
arg2 = float(sys.argv[2])
arg3 = float(sys.argv[3])
arg4 = float(sys.argv[4])
arg5 = float(sys.argv[5])
arg6 = float(sys.argv[6])
arg7 = float(sys.argv[7])
# arg8 = float(sys.argv[8])
# arg9 = float(sys.argv[9])

example_batch = [[arg1,arg2,arg3,arg4,arg5,arg6,arg7]]
example_result = mod_el.predict(example_batch)
print(example_result[0][0])
